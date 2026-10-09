import { create } from "zustand";
import { getUsersAPI } from "../api/usersAPI";
import type { UserPicker } from "../types/responsesTypes";

interface userState {
  users: UserPicker[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
}

export const useUserStore = create<userState>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({
      loading: true,
      error: null,
    });
    try {
      const users = await getUsersAPI();
      set({
        users,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Failed to load users",
      });
    }
  },
}));
