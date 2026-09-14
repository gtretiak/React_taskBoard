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
  // extracting all valid values from the JS object
export interface ThemeProviderProps {
  children: ReactNode;
} // ReactNode represents any child component React can render
