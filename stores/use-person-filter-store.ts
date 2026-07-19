import { create } from "zustand";

interface PersonFilterState {
  search: string;
  page: number;
  limit: number;
  is_active?: boolean;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setIsActive: (is_active?: boolean) => void;
  reset: () => void;
}

const DEFAULT_LIMIT = 15;
const DEFAULT_IS_ACTIVE = false;

export const usePersonFilterStore = create<PersonFilterState>((set) => ({
  search: "",
  page: 1,
  limit: DEFAULT_LIMIT,
  is_active: DEFAULT_IS_ACTIVE,
  setSearch: (search) => set({ search, page: 1 }),
  setPage: (page) => set({ page }),
  setIsActive: (is_active) => set({ is_active, page: 1 }),
  reset: () =>
    set({
      search: "",
      page: 1,
      limit: DEFAULT_LIMIT,
      is_active: DEFAULT_IS_ACTIVE,
    }),
}));
