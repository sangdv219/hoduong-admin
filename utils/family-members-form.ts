import {
  FamilyMembersDTO,
  FamilyMembersFormValues,
} from "@/types/family-members";

export const formFamilyMembersDefault = {
  email: "",
  password: "1234567",
  other_name: "",
  gender: 0,
  phone: "",
  birth_date: "",
  life_status: 1,
  year_of_death: "",
  burial_place: "",
  address: "",
  biography: "",
};
export function familyMembersToFormValues(
  familyMembers: FamilyMembersDTO,
): FamilyMembersFormValues {
  return {
    email: familyMembers.email,
    fullname: familyMembers.fullname,
    password: familyMembers.password ?? null,
    other_name: familyMembers.other_name ?? undefined,
    age: familyMembers.age,
    gender: familyMembers.gender,
    phone: familyMembers.phone,
    birth_date: familyMembers.birth_date ?? undefined,
    year_of_death: familyMembers.year_of_death ?? undefined,
    burial_place: familyMembers.burial_place ?? undefined,
    address: familyMembers.address ?? undefined,
    biography: familyMembers.biography ?? undefined,
    status: familyMembers.status,
    life_status: familyMembers.life_status,
    roles: familyMembers.roles,
  };
}
