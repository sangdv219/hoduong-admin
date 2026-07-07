export type PersonGender = "Nam" | "Nữ";

export type PersonStatus = "Còn sống" | "Đã mất";

export interface PersonDTO {
  id: string;
  familyId: string;
  firstName: string;
  lastName: string;
  gender: PersonGender;
  birthDate: string;
  otherName?: string | null;
  yearOfDeath?: number | null;
  burialPlace?: string | null;
  address?: string | null;
  biography?: string | null;
  status: PersonStatus;
  email?: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PersonSearchRecordDTO {
  records: {
    data: PersonDTO[] | null;
    total: number;
  };
}

export interface CreatePersonDTO {
  familyId: string;
  firstName: string;
  lastName: string;
  gender: PersonGender;
  birthDate: string;
  email?: string;
}

export interface UpdatePersonDTO {
  firstName?: string;
  lastName?: string;
  gender?: PersonGender;
  birthDate?: string;
  otherName?: string | null;
  yearOfDeath?: number | null;
  burialPlace?: string | null;
  address?: string | null;
  biography?: string | null;
  status?: PersonStatus;
  email?: string | null;
  isActive?: boolean;
}

export interface PersonSearchParams {
  q?: string;
  page?: number;
  limit?: number;
  isActive?: boolean;
}

export interface PaginatedResponse<T> {
  records: {
    data: T[] | null;
  };
  totalRecord: number;
}

export interface PersonFormValues {
  familyId: string;
  firstName: string;
  lastName: string;
  gender: PersonGender;
  birthDate: string;
  otherName?: string;
  yearOfDeath?: number;
  burialPlace?: string;
  address?: string;
  biography?: string;
  status: PersonStatus;
  email?: string;
  isActive: boolean;
}
