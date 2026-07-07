export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api/v1";

export const DEFAULT_FAMILY_ID =
  process.env.NEXT_PUBLIC_DEFAULT_FAMILY_ID ?? "";

export const PERSON_QUERY_KEYS = {
  all: ["user-admin"] as const,
  list: (params: Record<string, unknown>) =>
    ["user-admin", "list", params] as const,
  detail: (id: string) => ["user-admin", "detail", id] as const,
};
