import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  user: null,

  login: (token, user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
    set({ token, user });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    set({ token: null, user: null });
  },
}));
