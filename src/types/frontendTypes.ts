import type { ReactNode } from "react";

export interface AuthContextValue {
  accessToken: string | null;
  login: (nickname: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    nickname: string,
    password: string,
    email?: string,
  ) => Promise<void>;
}
export interface AuthProviderProps {
  children: ReactNode;
}
export const THEME = {
  dark: "dark",
  light: "light",
} as const;
export type ThemeContextValue = (typeof THEME)[keyof typeof THEME];
export interface ThemeProviderProps {
  children: ReactNode;
} // ReactNode something React can render as a child
