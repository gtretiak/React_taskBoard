import { create } from "zustand";
import type { LoginRequest, RegisterRequest } from "../types/requestsTypes";
import { loginAPI, registerAPI } from "../api/authAPI";
import type { UserPicker } from "../types/responsesTypes";

interface AuthState {
  accessToken: string | null;
  user: UserPicker | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginRequest) => Promise<boolean>;
  register: (data: RegisterRequest) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AUTH_KEY = "accessToken";

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem(AUTH_KEY),
  user: null,
  loading: false,
  error: null,

  login: async (data) => {
    set({
      loading: true,
      error: null,
    });
    try {
      const response = await loginAPI(data);
      localStorage.setItem(AUTH_KEY, response.accessToken);
      set({
        accessToken: response.accessToken,
        user: response.user,
        loading: false,
      });
      return true;
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Failed to login",
      });
      return false;
    }
  },

  register: async (data) => {
    set({
      loading: true,
      error: null,
    });
    try {
      await registerAPI(data);
      set({
        loading: false,
      });
      return true;
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Failed to register",
      });
      return false;
    }
  },

  logout: async () => {
    localStorage.removeItem(AUTH_KEY);
    set({
      accessToken: null,
      user: null,
    });
  },
}));
