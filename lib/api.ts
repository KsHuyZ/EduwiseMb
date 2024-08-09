import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Axios from "axios";

import { RefreshTokenResponse, Token } from "@/types";
import { getStorage, setStorage } from "@/utils";

const API_URL = 'http://10.50.84.176:8080';
console.log(API_URL);
const refreshTokenApi = (refreshToken: string): Promise<RefreshTokenResponse> =>
  Axios.post(`${API_URL}/auth/refresh`, `Bearer ${refreshToken}`);

const api = Axios.create({
  baseURL: API_URL,
});

const onResponseSuccess = (response: AxiosResponse) => {
  return response.data;
};

const onResponseError = async (error: AxiosError) => {
  if (error.response) {
    return Promise.reject(error.response);
  }
  return Promise.reject(error);
};

api.interceptors.response.use(onResponseSuccess, onResponseError);

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = (await getStorage("token")) as Token;
    if (token) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.status === 401 || error.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const token = (await getStorage("token")) as Token | undefined;
      const refreshToken = token?.refreshToken;
      if (refreshToken) {
        const result = await refreshTokenApi(refreshToken);
        const { token, refreshToken: newRefreshToken } = result;
        setStorage("token", { token, refreshToken: newRefreshToken });
        originalRequest.headers = {
          Authorization: "Bearer " + result.token,
        };
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
