import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  total: 0,
  categories: [],
  loading: false,

  fetchCategories: async () => {
    try {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();
      set({ categories: data });
    } catch (error) {
      console.error("Category fetch error:", error);
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

  // 🔥 ADD THIS MISSING FUNCTION
  fetchSingleProduct: async (id) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Single product fetch error:", error);
      return null;
    }
  },
}));
