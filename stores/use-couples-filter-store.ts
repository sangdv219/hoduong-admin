import { create } from "zustand";

interface CouplesFilterState {
  keyword?: string;
  page: number;
  limit: number;
  partner_1_id?: string;
  partner_2_id?: string;
  couple_order?: number;
  marriage_status?: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
  divorce_date?: Date;
  setKeyword: (search: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  reset: () => void;
  setPartner1: (partner1?: string) => void;
  setPartner2: (partner2?: string) => void;
  setCoupleOrder: (couple_order: number) => void;
  setMarriageStatus: (
    status?: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED",
  ) => void;
  setDivorceDate: (divorce_date?: Date) => void;
}

const DEFAULT_LIMIT = 10;

export const useCouplesFilterStore = create<CouplesFilterState>((set) => ({
  keyword: undefined,
  page: 1,
  limit: DEFAULT_LIMIT,
  partner_1_id: undefined,
  partner_2_id: undefined,
  couple_order: undefined,
  marriage_status: undefined,
  divorce_date: undefined,
  setKeyword: (keyword) => set({ keyword, page: 1 }),
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
  setPartner1: (partner1) => set({ partner_1_id: partner1, page: 1 }),
  setPartner2: (partner2) => set({ partner_2_id: partner2, page: 1 }),
  setCoupleOrder: (couple_order) => set({ couple_order }),
  setMarriageStatus: (marriage_status) => set({ marriage_status }),
  setDivorceDate: (divorce_date) => set({ divorce_date }),
  reset: () =>
    set({
      keyword: undefined,
      page: 1,
      limit: DEFAULT_LIMIT,
      partner_1_id: undefined,
      partner_2_id: undefined,
      couple_order: undefined,
      marriage_status: undefined,
      divorce_date: undefined,
    }),
}));
