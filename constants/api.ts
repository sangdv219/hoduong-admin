export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api/v1";

export const PERSON_QUERY_KEYS = {
  all: ["user-admin"] as const,
  list: (params: Record<string, unknown>) =>
    ["user-admin", "list", params] as const,
  detail: (id: string) => ["user-admin", "detail", id] as const,
};

export const GENDER_OPTIONS = [
  { value: 0, label: "Nam" },
  { value: 1, label: "Nữ" },
];

export const STATUS_OPTIONS = [
  { value: 0, label: "Đã mất" },
  { value: 1, label: "Còn sống" },
];

export type PersonGender = 0 | 1;

export type PersonStatus = 0 | 1;

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
  SUSPENDED = "suspended",
  ARCHIVED = "archived",
}
