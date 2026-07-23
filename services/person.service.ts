import { Status } from "@/constants/api";
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
  // if (params.q !== undefined && params.q !== "") query.set("q", params.q);
  if (params.keyword !== undefined)
    query.set("keyword", String(params.keyword));
  if (params.page !== undefined) query.set("page", String(params.page));
  if (params.limit !== undefined) query.set("limit", String(params.limit));
  if (params.status !== undefined) query.set("status", String(params.status));
  if (params.gender !== undefined) query.set("gender", String(params.gender));
  if (params.life_status !== undefined)
    query.set("life_status", String(params.life_status));

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
      body: { status: Status.INACTIVE },
    });
  },

  delete(id: string) {
    return apiClient<PersonDTO>(`/user-admin/${id}`, {
      method: "PATCH",
      body: { status: Status.ARCHIVED, deleted_at: new Date() },
    });
  },

  activate(id: string) {
    return apiClient<PersonDTO>(`/user-admin/${id}`, {
      method: "PATCH",
      body: { status: Status.ACTIVE },
    });
  },
};
