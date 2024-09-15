import { create } from "zustand";

interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  liked: boolean;
  category: string;
}

interface Filters {
  liked: boolean;
  priceRange: "all" | [number, number];
  searchQuery: string;
  category: string;
}

interface StoreState {
  products: Product[];
  filteredProducts: Product[];
  filters: Filters;
  addProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  toggleLike: (id: number) => void;
  setProducts: (products: Product[]) => void;
  setFilters: (filters: Partial<Filters>) => void;
  applyFilters: () => void;
}

const useStore = create<StoreState>((set) => ({
  products: [],
  filteredProducts: [],
  filters: {
    liked: false,
    priceRange: "all",
    searchQuery: "",
    category: "all",
  },
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
  toggleLike: (id) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, liked: !product.liked } : product
      ),
    })),
  setProducts: (products) => set({ products }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  applyFilters: () =>
    set((state) => {
      const { filters, products } = state;
      const { liked, priceRange, searchQuery, category } = filters;

      const filteredProducts = products.filter((product) => {
        const matchesLike = !liked || product.liked;
        const matchesSearch =
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          category === "all" || product.category === category;
        const matchesPrice =
          priceRange === "all" ||
          (Array.isArray(priceRange) &&
            product.price >= priceRange[0] &&
            product.price <= priceRange[1]);

        return matchesLike && matchesSearch && matchesCategory && matchesPrice;
      });

      return { filteredProducts };
    }),
}));

export default useStore;
