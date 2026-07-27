import { Status } from "@/constants/api";
import { apiClient } from "@/lib/api-client";
import {
  CreateRoleDTO,
  UpdateRoleDTO,
  RoleDTO,
  RoleSearchParams,
  RoleSearchRecordDTO,
} from "@/types/role";
import { PaginatedResponse } from "@/types/user";

function buildSearchQuery(params: RoleSearchParams): string {
  const query = new URLSearchParams();
  // if (params.q !== undefined && params.q !== "") query.set("q", params.q);
  if (params.keyword !== undefined)
    query.set("keyword", String(params.keyword));
  if (params.page !== undefined) query.set("page", String(params.page));
  if (params.limit !== undefined) query.set("limit", String(params.limit));
  if (params.sortBy !== undefined) query.set("sortBy", String(params.sortBy));
  if (params.sortOrder !== undefined)
    query.set("sortOrder", String(params.sortOrder));

  const qs = query.toString();
  return qs ? `?${qs}` : "";
}
export const roleService = {
  search(params: RoleSearchParams) {
    return apiClient<PaginatedResponse<RoleSearchRecordDTO>>(
      `/roles${buildSearchQuery(params)}`,
    );
  },

  getById(id: string) {
    return apiClient<RoleDTO>(`/roles/${id}`);
  },

  create(payload: CreateRoleDTO) {
    return apiClient<RoleDTO>("/roles", {
      method: "POST",
      body: payload,
    });
  },

  update(id: string, payload: UpdateRoleDTO) {
    return apiClient<RoleDTO>(`/roles/${id}`, {
      method: "PATCH",
      body: payload,
    });
  },
};
