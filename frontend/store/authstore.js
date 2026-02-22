
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  setAuth: (data) => set(data),
  logout: () => set({ user: null, accessToken: null })
}));