import { createContext, useState } from "react";
import { type AuthContextValue, type AuthProviderProps } from "../types/types";

export const AuthContext = createContext<AuthContextValue | null>(null); // creates context, initially null

export function AuthProvider({ children }: AuthProviderProps) {
  const AUTH_KEY = "accessToken";
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem(AUTH_KEY),
  ); // creates component that provides the context value

  function login(username: string, password: string) {
    const fakeToken = crypto.randomUUID(); // fake token generating
    localStorage.setItem(AUTH_KEY, fakeToken); // saving the token in the persistent browser storage
    console.log(username, password);
    setAccessToken(fakeToken); // changes React state
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    setAccessToken(null);
  }

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  ); // token and both functions become available to child components
}
