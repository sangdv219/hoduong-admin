import { create } from "zustand";

interface PersonFilterState {
  keyword?: string;
  page: number;
  limit: number;
  status?: "suspended" | "pending" | "inactive" | "active";
  gender?: number;
  life_status?: number;
  setKeyword: (search: string) => void;
  setPage: (page: number) => void;
  reset: () => void;
  setStatus: (status?: "suspended" | "pending" | "inactive" | "active") => void;
  setGender: (gender?: number) => void;
  setLifeStatus: (life_status?: number) => void;
}

const DEFAULT_LIMIT = 15;

export const usePersonFilterStore = create<PersonFilterState>((set) => ({
  keyword: undefined,
  page: 1,
  limit: DEFAULT_LIMIT,
  status: undefined,
  gender: undefined,
  setKeyword: (keyword) => set({ keyword, page: 1 }),
  setPage: (page) => set({ page }),
  setStatus: (status) => set({ status, page: 1 }),
  setGender: (gender) => set({ gender, page: 1 }),
  setLifeStatus: (life_status) => set({ life_status, page: 1 }),
  reset: () =>
    set({
      keyword: undefined,
      page: 1,
      limit: DEFAULT_LIMIT,
      status: undefined,
      gender: undefined,
      life_status: undefined,
    }),
}));
