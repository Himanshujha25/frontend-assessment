import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  total: 0,
  categories: [],
  loading: false,

  fetchCategories: async () => {
    try {
      set({ loading: true });

      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();

      // FIX: Always replace categories, never append
      set({ categories: data, loading: false });

    } catch (error) {
      console.error("Category fetch error:", error);
      set({ loading: false });
    }
  },

  fetchProducts: async (limit, skip, search, category) => {
    try {
      set({ loading: true });

      let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

      if (search) url += `&q=${search}`;
      if (category !== "all") url += `&category=${category}`;

      const res = await fetch(url);
      const data = await res.json();

      set({
        products: data.products,
        total: data.total,
        loading: false,
      });

    } catch (error) {
      console.error("Product fetch error:", error);
      set({ loading: false });
    }
  },
}));
