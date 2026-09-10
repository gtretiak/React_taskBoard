import { create } from "zustand";
import type {
  ChangePasswordRequest,
  LoginRequest,
  RegisterRequest,
} from "../types/requestsTypes";
import { changePasswordAPI, loginAPI, registerAPI } from "../api/authAPI";
import type { UserPicker } from "../types/responsesTypes";

interface AuthState {
  accessToken: string | null;
  user: UserPicker | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginRequest) => Promise<boolean>;
  register: (data: RegisterRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  invalidateSession: () => void;
  changePassword: (data: ChangePasswordRequest) => Promise<boolean>;
}

const AUTH_KEY = "accessToken";
const USER_KEY = "user";

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem(AUTH_KEY),
  user: JSON.parse(localStorage.getItem(USER_KEY) || "null"),
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
      localStorage.setItem(USER_KEY, JSON.stringify(response.user));
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
    localStorage.removeItem(USER_KEY);
    set({
      accessToken: null,
      user: null,
    });
  },

  invalidateSession: () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
    set({
      accessToken: null,
      user: null,
    });
  },

  changePassword: async (data) => {
    set({
      loading: true,
      error: null,
    });
    try {
      await changePasswordAPI(data);
      set({
        loading: false,
      });
      return true;
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error ? error.message : "Failed to change password",
      });
      return false;
    }
  },
}));
