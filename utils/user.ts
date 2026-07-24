import type { UserDTO, UserFormValues } from "@/types/user";

export function userToFormValues(user: UserDTO): UserFormValues {
  return {
    email: user.email,
    fullname: user.fullname,
    password: user.password,
    roleId: user.roleId,
    other_name: user.other_name ?? undefined,
    age: user.age,
    gender: user.gender,
    phone: user.phone,
    birth_date: user.birth_date ?? undefined,
    year_of_death: user.year_of_death ?? undefined,
    burial_place: user.burial_place ?? undefined,
    address: user.address ?? undefined,
    biography: user.biography ?? undefined,
    status: user.status,
    life_status: user.life_status,
  };
}

export function formatGender(gender: UserDTO["gender"]): string {
  return gender === 0 ? "Nam" : "Nữ";
}
