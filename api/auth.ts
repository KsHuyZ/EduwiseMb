import api from "@/lib/api";
import {
  SignInResponse,
  TSignUpCredentials,
  TSignInCredentials,
} from "@/types";

export const signOut = () => api.get("/auth/logout");

export const teacherSignUp = (user: TSignUpCredentials) =>
  api.post("/auth/register-teacher", user);

export const signUp = (user: TSignUpCredentials) =>
  api.post("/auth/register", user);

export const signIn = (user: TSignInCredentials): Promise<SignInResponse> =>
  api.post("/auth/login", user);
