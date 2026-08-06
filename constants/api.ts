export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const USER_QUERY_KEYS = {
  all: ["user-admin"] as const,
  list: (params: Record<string, unknown>) =>
    ["user-admin", "list", params] as const,
  detail: (id: string) => ["user-admin", "detail", id] as const,
};
export const ROLE_QUERY_KEYS = {
  all: ["role"] as const,
  list: (params: Record<string, unknown>) => ["role", "list", params] as const,
  detail: (id: string) => ["role", "detail", id] as const,
};
export const FAMILY_MEMBERS_QUERY_KEYS = {
  all: ["family_members"] as const,
  list: (params: Record<string, unknown>) =>
    ["family_members", "list", params] as const,
  detail: (id: string) => ["family_members", "detail", id] as const,
};

export const GENDER_OPTIONS = [
  { value: 0, label: "Nam" },
  { value: 1, label: "Nữ" },
];

export const STATUS_OPTIONS = [
  { value: 0, label: "Đã mất" },
  { value: 1, label: "Còn sống" },
];

export const STATUS_MARRIE_OPTIONS = [
  { value: "SINGLE", label: "Độc thân" },
  { value: "MARRIED", label: "Đã kết hôn" },
  { value: "DIVORCED", label: "Đã ly hôn" },
  { value: "WIDOWED", label: "Goá phụ" },
];

export type UserGender = 0 | 1;

export type LifeStatus = 0 | 1;

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
  SUSPENDED = "suspended",
  ARCHIVED = "archived",
}
