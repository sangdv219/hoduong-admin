import { create } from "zustand";

interface PersonFilterState {
  search: string;
  page: number;
  limit: number;
  status?: "suspended" | "pending" | "inactive" | "active";
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  reset: () => void;
  setStatus: (status?: "suspended" | "pending" | "inactive" | "active") => void;
}

const DEFAULT_LIMIT = 15;

export const usePersonFilterStore = create<PersonFilterState>((set) => ({
  search: "",
  page: 1,
  limit: DEFAULT_LIMIT,
  status: undefined,
  setSearch: (search) => set({ search, page: 1 }),
  setPage: (page) => set({ page }),
  setStatus: (status) => set({ status, page: 1 }),
  reset: () =>
    set({
      search: "",
      page: 1,
      limit: DEFAULT_LIMIT,
      status: undefined,
    }),
}));
