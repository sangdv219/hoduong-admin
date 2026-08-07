import { FamilyMembersGender, LifeStatus, Status } from "@/constants/api";

export interface IFamilyMembersDTO {
  id: string;
  user_id: string;
  parent_couple_id: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface IFamilyMembersDetailDTO {
  items: IFamilyMembersDTO;
}

export interface IFamilyMembersSearchRecordDTO {
  records: {
    items: IFamilyMembersDTO[] | null;
    totalRecord: number;
  };
}

export interface ICreateFamilyMembersDTO {
  user_id: string;
  parent_couple_id: string;
}

export interface IUpdateFamilyMembersDTO {
  fullname: string;
  other_name: string | null;
  gender: FamilyMembersGender;
  phone: string | null;
  age: number | null;
  birth_date?: Date | string | null;
  life_status: LifeStatus;
  year_of_death?: Date | string | null;
  burial_place?: string | null;
  address?: string | null;
  biography?: string | null;
  roles: string[];
}

export interface IFamilyMembersSearchParams {
  keyword?: string;
  q?: string;
  page?: number;
  limit?: number;
  status?: "suspended" | "pending" | "inactive" | "active";
  gender?: number;
  life_status?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  role_id?: string;
}

export interface IFamilyMembersFormValues {
  user_id: string;
  parent_couple_id: string;
}
