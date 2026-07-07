import type { PersonDTO, PersonFormValues } from "@/types/person";

export function personToFormValues(person: PersonDTO): PersonFormValues {
  return {
    familyId: person.familyId,
    firstName: person.firstName,
    lastName: person.lastName,
    gender: person.gender,
    birthDate: person.birthDate,
    otherName: person.otherName ?? undefined,
    yearOfDeath: person.yearOfDeath ?? undefined,
    burialPlace: person.burialPlace ?? undefined,
    address: person.address ?? undefined,
    biography: person.biography ?? undefined,
    status: person.status,
    email: person.email ?? undefined,
    isActive: person.isActive,
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
