import { RoleGender, LifeStatus, Status } from "@/constants/api";

export interface RoleDTO {
  id: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoleSearchRecordDTO {
  records: {
    items: RoleDTO[] | null;
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateRoleDTO {
  name: string;
  description: string;
}

export interface UpdateRoleDTO {
  name: string;
  description: string;
}

export interface RoleSearchParams {
  keyword?: string;
  q?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export interface RoleFormValues {
  name: string;
  description: string;
}
