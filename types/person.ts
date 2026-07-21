export type PersonGender = 0 | 1;

export type PersonStatus = 1 | 0;

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
  status: PersonStatus;
  is_active: boolean;
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
  status?: PersonStatus;
  is_active: boolean;
}

export interface UpdatePersonDTO {
  email?: string | null;
  fullname?: string;
  password: string;
  roleId: string;
  other_name?: string | null;
  gender: PersonGender;
  status: PersonStatus;
  lastName?: string;
  phone?: string | null;
  birth_date?: Date | string | null;
  year_of_death?: Date | string | null;
  burial_place?: string | null;
  age: number | null;
  address?: string | null;
  biography?: string | null;
  is_active?: boolean;
}

export interface PersonSearchParams {
  q?: string;
  page?: number;
  limit?: number;
  is_active?: boolean;
}

export interface PaginatedResponse<T> {
  records: {
    items: T[] | null;
  };
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
  status: PersonStatus;
  is_active: boolean;
}
