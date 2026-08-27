import { createContext, useState } from "react";
import { type AuthContextValue, type AuthProviderProps } from "../types/types";
import { apiRequest } from "../api/client";

export const AuthContext = createContext<AuthContextValue | null>(null); // to be replaced with usage of RegisterRequest and LoginRequest + AuthResponse and UserPicker, then add name addressing TODO

export function AuthProvider({ children }: AuthProviderProps) {
  const AUTH_KEY = "accessToken";
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem(AUTH_KEY),
  ); // creates component that provides the context value

  const register = async (
    nickname: string,
    password: string,
    email?: string,
  ) => {
    const response = await apiRequest("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname, password, email }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const data = await response.json();
    const token = data.accessToken;
    localStorage.setItem(AUTH_KEY, token); // saving the token in the persistent browser storage
    console.log(nickname, password, email);
    alert("Registration successful!");
    setAccessToken(token); // changes React state
  };

  const login = async (nickname: string, password: string) => {
    const response = await apiRequest("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const data = await response.json();
    const token = data.accessToken;
    localStorage.setItem(AUTH_KEY, token); // saving the token in the persistent browser storage
    console.log(nickname, password);
    setAccessToken(token); // changes React state
  };

  const logout = async () => {
    localStorage.removeItem(AUTH_KEY);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  ); // token and both functions become available to child components
}
