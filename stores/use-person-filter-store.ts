import { create } from "zustand";

interface PersonFilterState {
  search: string;
  page: number;
  limit: number;
  isActive?: boolean;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setIsActive: (isActive?: boolean) => void;
  reset: () => void;
}

const DEFAULT_LIMIT = 20;

export const usePersonFilterStore = create<PersonFilterState>((set) => ({
  search: "",
  page: 1,
  limit: DEFAULT_LIMIT,
  isActive: undefined,
  setSearch: (search) => set({ search, page: 1 }),
  setPage: (page) => set({ page }),
  setIsActive: (isActive) => set({ isActive, page: 1 }),
  reset: () => set({ search: "", page: 1, limit: DEFAULT_LIMIT, isActive: undefined }),
}));
