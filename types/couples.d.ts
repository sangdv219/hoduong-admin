import { CouplesGender, LifeStatus, Status } from "@/constants/api";

export interface ICouplesDTO {
  id: string;
  partner_1_id: string;
  partner_2_id: string;
  couple_order: number;
  marriage_status: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
  divorce_date: Date;
  createdAt?: string;
  updatedAt?: string;
}
export interface ICouplesDetailDTO {
  items: ICouplesDTO;
}

export interface ICouplesSearchRecordDTO {
  records: {
    items: ICouplesDTO[] | null;
    totalRecord: number;
  };
}

export interface ICreateCouplesDTO {
  partner_1_id: string;
  partner_2_id: string;
  couple_order: number;
  marriage_status: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
  divorce_date: Date;
}

export interface IUpdateCouplesDTO {
  partner_1_id?: string;
  partner_2_id?: string;
  couple_order?: number;
  marriage_status?: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
  divorce_date?: Date;
}

export interface ICouplesSearchParams {
  keyword?: string;
  q?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  partner_1_id?: string;
  partner_2_id?: string;
  couple_order?: number;
  marriage_status?: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
  divorce_date?: Date;
}

export interface CouplesFormValues {
  partner_1_id?: string;
  partner_2_id?: string;
  couple_order?: number;
  marriage_status?: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
  divorce_date?: Date;
}
