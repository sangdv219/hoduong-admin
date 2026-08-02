import { FamilyMembersGender, LifeStatus, Status } from "@/constants/api";

export interface FamilyMembersDTO {
  id: string;
  user_id: string;
  father_id: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface FamilyMembersDetailDTO {
  items: FamilyMembersDTO;
}

export interface FamilyMembersSearchRecordDTO {
  records: {
    items: FamilyMembersDTO[] | null;
    totalRecord: number;
  };
}

export interface CreateFamilyMembersDTO {
  user_id: string;
  father_id: string;
}

export interface UpdateFamilyMembersDTO {
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

export interface FamilyMembersSearchParams {
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

export interface FamilyMembersFormValues {
  user_id: string;
  father_id: string;
}
