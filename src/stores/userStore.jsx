import { create } from "zustand";
import api from "@/lib/api";
export const useUserStore = create((set, get) => ({
  users: [],
  total: 0,
  cache: {},

  fetchUsers: async (limit, skip, search) => {
  set({ loading: true });

  try {
    let res;

    // If searching → use search endpoint 
    if (search.trim() !== "") {
      res = await api.get(`/users/search?q=${search}&limit=${limit}&skip=${skip}`);
    } 
    // No search → normal pagination
    else {
      res = await api.get(`/users?limit=${limit}&skip=${skip}`);
    }

    set((state) => ({
      users: res.data.users,
      total: res.data.total,
      loading: false,
      cache: {
        ...state.cache,
        [`${limit}-${skip}-${search}`]: res.data,
      },
    }));

  } catch (error) {
    console.log("User fetch error:", error);
    set({ loading: false });
  }
},
fetchSingleUser: async (id) => {
  try {
    const res = await api.get(`/users/${id}`);
    return res.data;
  } catch (err) {
    console.log("User details error:", err);
    return null;
  }
},

}));
