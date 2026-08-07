import { create } from "zustand";

interface FamilyMembersFilterState {
  keyword?: string;
  page: number;
  limit: number;
  status?: "suspended" | "pending" | "inactive" | "active";
  gender?: number;
  life_status?: number;
  roleId?: string;
  setKeyword: (search: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  reset: () => void;
  setStatus: (status?: "suspended" | "pending" | "inactive" | "active") => void;
  setGender: (gender?: number) => void;
  setLifeStatus: (life_status?: number) => void;
  setRoleId: (roleId?: string) => void;
}

const DEFAULT_LIMIT = 10;

export const useFamilyMembersFilterStore = create<FamilyMembersFilterState>(
  (set) => ({
    keyword: undefined,
    page: 1,
    limit: DEFAULT_LIMIT,
    status: undefined,
    gender: undefined,
    roleId: undefined,
    setKeyword: (keyword) => set({ keyword, page: 1 }),
    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit }),
    setStatus: (status) => set({ status, page: 1 }),
    setGender: (gender) => set({ gender, page: 1 }),
    setLifeStatus: (life_status) => set({ life_status, page: 1 }),
    setRoleId: (roleId) => set({ roleId }),
    reset: () =>
      set({
        keyword: undefined,
        page: 1,
        limit: DEFAULT_LIMIT,
        status: undefined,
        gender: undefined,
        life_status: undefined,
        roleId: undefined,
      }),
  }),
);
