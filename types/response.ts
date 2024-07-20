import { Token, TUser } from "@/types";

export type RefreshTokenResponse = {
  token: string;
  refreshToken: string;
  expires: { token: number; refreshToken: number };
};
export type SignInResponse = {
  expiresIn: {
    token: number;
    refreshToken: number;
  };
  userResponse: TUser;
} & Token;

export type TableApiResponse<T> = {
  page: number;
  pages: number;
  size: number;
  total: number;
  items: T;
};
