import { UserGender, LifeStatus, Status } from "@/constants/api";

export interface UserDTO {
  id: string;
  email: string;
  fullname: string;
  password: string;
  roleId: string;
  other_name?: string | null;
  age?: number | null;
  gender: UserGender;
  phone?: string | null;
  birth_date?: Date | null;
  year_of_death?: Date | null;
  burial_place?: string | null;
  address?: string | null;
  biography?: string | null;
  life_status: LifeStatus;
  status: Status;
  roles: Recod<string, string>[];
  createdAt?: string;
  updatedAt?: string;
}
export interface UserDetailDTO {
  items: UserDTO;
}

export interface UserSearchRecordDTO {
  records: {
    items: UserDTO[] | null;
    // total: number;
    // page: number;
    // limit: number;
    totalRecord: number;
  };
}

export interface CreateUserDTO {
  email?: string | null;
  fullname?: string;
  password: string;
  other_name?: string | null;
  gender: UserGender;
  phone?: string | null;
  birth_date?: Date | string | null;
  year_of_death?: Date | string | null;
  burial_place?: string | null;
  age: number | null;
  address?: string | null;
  biography?: string | null;
  life_status: LifeStatus;
}

export interface UpdateUserDTO {
  fullname: string;
  other_name: string | null;
  gender: UserGender;
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

export interface UserSearchParams {
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

export interface PaginatedResponse<T> {
  items: T[] | null;
  totalRecord: number;
}

export interface UserFormValues {
  email?: string | null;
  fullname?: string;
  password: string | null;
  other_name?: string | null;
  age?: number | null;
  gender: UserGender;
  phone?: string | null;
  birth_date?: Date | null;
  year_of_death?: Date | null;
  burial_place?: string | null;
  address?: string | null;
  biography?: string | null;
  status?: Status;
  life_status: LifeStatus;
  roles: Recod<string, string>[];
}
