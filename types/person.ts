import { PersonGender, PersonStatus, Status } from "@/constants/api";

export interface PersonDTO {
  id: string;
  email: string;
  fullname: string;
  password: string;
  roleId: string;
  other_name?: string | null;
  age?: number | null;
  gender: PersonGender;
  phone?: string | null;
  birth_date?: Date | null;
  year_of_death?: Date | null;
  burial_place?: string | null;
  address?: string | null;
  biography?: string | null;
  life_status: PersonStatus;
  status: Status;
  createdAt?: string;
  updatedAt?: string;
}

export interface PersonSearchRecordDTO {
  records: {
    items: PersonDTO[] | null;
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreatePersonDTO {
  email?: string | null;
  fullname?: string;
  roleId: string;
  password: string;
  other_name?: string | null;
  gender: PersonGender;
  phone?: string | null;
  birth_date?: Date | string | null;
  year_of_death?: Date | string | null;
  burial_place?: string | null;
  age: number | null;
  address?: string | null;
  biography?: string | null;
  life_status: PersonStatus;
}

export interface UpdatePersonDTO {
  fullname: string;
  roleId: string;
  other_name: string | null;
  gender: PersonGender;
  phone: string | null;
  age: number | null;
  birth_date?: Date | string | null;
  life_status: PersonStatus;
  year_of_death?: Date | string | null;
  burial_place?: string | null;
  address?: string | null;
  biography?: string | null;
}

export interface PersonSearchParams {
  q?: string;
  page?: number;
  limit?: number;
  // status?: "suspended" | "pending" | "inactive" | "active";
  status?: "suspended" | "pending" | "inactive" | "active";
}

export interface PaginatedResponse<T> {
  items: T[] | null;
  totalRecord: number;
}

export interface PersonFormValues {
  email?: string | null;
  fullname?: string;
  password: string;
  roleId: string;
  other_name?: string | null;
  age?: number | null;
  gender: PersonGender;
  phone?: string | null;
  birth_date?: Date | null;
  year_of_death?: Date | null;
  burial_place?: string | null;
  address?: string | null;
  biography?: string | null;
  status?: Status;
  life_status: PersonStatus;
}
