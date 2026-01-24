import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    error?: string;
    user: {
      accessToken?: string;
      refreshToken?: string;
      username?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    username?: string;
    error?: string;
  }
}
