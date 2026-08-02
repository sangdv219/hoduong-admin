import type { IUser, UserFormValues } from "@/types/user";

export const formUserDefault = {
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
export function userToFormValues(user: IUser): UserFormValues {
  return {
    email: user.email,
    fullname: user.fullname,
    password: user.password ?? null,
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
    roles: user.roles,
  };
}

export function formatGender(gender: IUser["gender"]): string {
  return gender === 0 ? "Nam" : "Nữ";
}
