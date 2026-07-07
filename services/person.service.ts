import { apiClient } from "@/lib/api-client";
import type {
  CreatePersonDTO,
  PaginatedResponse,
  PersonDTO,
  PersonSearchParams,
  PersonSearchRecordDTO,
  UpdatePersonDTO,
} from "@/types/person";

function buildSearchQuery(params: PersonSearchParams): string {
  const query = new URLSearchParams();

  if (params.q) query.set("q", params.q);
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));

  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

export const personService = {
  search(params: PersonSearchParams) {
    return apiClient<PaginatedResponse<PersonSearchRecordDTO>>(
      `/user-admin${buildSearchQuery(params)}`,
    );
  },

  getById(id: string) {
    return apiClient<PersonDTO>(`/user-admin/${id}`);
  },

  create(payload: CreatePersonDTO) {
    return apiClient<PersonDTO>("/user-admin", {
      method: "POST",
      body: payload,
    });
  },

  update(id: string, payload: UpdatePersonDTO) {
    return apiClient<PersonDTO>(`/user-admin/${id}`, {
      method: "PATCH",
      body: payload,
    });
  },

  deactivate(id: string) {
    return apiClient<PersonDTO>(`/user-admin/${id}`, {
      method: "PATCH",
      body: { isActive: false },
    });
  },

  activate(id: string) {
    return apiClient<PersonDTO>(`/user-admin/${id}`, {
      method: "PATCH",
      body: { isActive: true },
    });
  },
};
