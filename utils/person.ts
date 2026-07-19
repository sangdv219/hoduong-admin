import type { PersonDTO, PersonFormValues } from "@/types/person";

export function personToFormValues(person: PersonDTO): PersonFormValues {
  return {
    familyId: person.familyId,
    firstName: person.firstName,
    lastName: person.lastName,
    gender: person.gender,
    birth_date: person.birth_date,
    other_name: person.other_name ?? undefined,
    birth_date: person.birth_date ?? undefined,
    burial_place: person.burial_place ?? undefined,
    address: person.address ?? undefined,
    biography: person.biography ?? undefined,
    status: person.status,
    email: person.email ?? undefined,
    is_active: person.is_active,
  };
}

export function formatPersonName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim();
}

export function formatGender(gender: PersonDTO["gender"]): string {
  return gender === "Nam" ? "Nam" : "Nữ";
}

export function formatStatus(status: PersonDTO["status"]): string {
  return status === "Còn sống" ? "Còn sống" : "Đã mất";
}
