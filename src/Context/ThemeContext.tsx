import { createContext } from "react";
import {
  THEME,
  type ThemeContextValue,
  type ThemeProviderProps,
} from "../types/types";

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme: ThemeContextValue =
    import.meta.env.VITE_THEME === THEME.dark ? THEME.dark : THEME.light;
  console.log("VITE_THEME:", import.meta.env.VITE_THEME);
  return (
    <ThemeContext.Provider value={theme}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}
