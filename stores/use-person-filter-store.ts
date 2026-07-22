import { create } from "zustand";

interface PersonFilterState {
  search: string;
  page: number;
  limit: number;
  status?: boolean;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setIsActive: (status?: boolean) => void;
  reset: () => void;
}

const DEFAULT_LIMIT = 15;

export const usePersonFilterStore = create<PersonFilterState>((set) => ({
  search: "",
  page: 1,
  limit: DEFAULT_LIMIT,
  setSearch: (search) => set({ search, page: 1 }),
  setPage: (page) => set({ page }),
  setIsActive: (status) => set({ status, page: 1 }),
  reset: () =>
    set({
      search: "",
      page: 1,
      limit: DEFAULT_LIMIT,
    }),
}));
