import type { PersonDTO, PersonFormValues } from "@/types/person";

export function personToFormValues(person: PersonDTO): PersonFormValues {
  return {
    email: person.email,
    fullname: person.fullname,
    password: person.password,
    roleId: person.roleId,
    other_name: person.other_name ?? undefined,
    age: person.age,
    gender: person.gender,
    phone: person.phone,
    birth_date: person.birth_date ?? undefined,
    year_of_death: person.year_of_death ?? undefined,
    burial_place: person.burial_place ?? undefined,
    address: person.address ?? undefined,
    biography: person.biography ?? undefined,
    status: person.status,
    is_active: person.is_active,
  };
}

export function formatGender(gender: PersonDTO["gender"]): string {
  return gender === 0 ? "Nam" : "Nữ";
}

export function formatStatus(status: PersonDTO["status"]): string {
  return status === 1 ? "Còn sống" : "Đã mất";
}
