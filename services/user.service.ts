import { Status } from "@/constants/api";
import { apiClient } from "@/lib/api-client";
import {
  CreateUserDTO,
  PaginatedResponse,
  UpdateUserDTO,
  UserDetailDTO,
  UserDTO,
  UserSearchParams,
  UserSearchRecordDTO,
} from "@/types/user";

function buildSearchQuery(params: UserSearchParams): string {
  const query = new URLSearchParams();
  if (params.keyword !== undefined)
    query.set("keyword", String(params.keyword));
  if (params.page !== undefined) query.set("page", String(params.page));
  if (params.limit !== undefined) query.set("limit", String(params.limit));
  if (params.status !== undefined) query.set("status", String(params.status));
  if (params.gender !== undefined) query.set("gender", String(params.gender));
  if (params.sortBy !== undefined) query.set("sortBy", String(params.sortBy));
  if (params.sortOrder !== undefined)
    query.set("sortOrder", String(params.sortOrder));
  if (params.life_status !== undefined)
    query.set("life_status", String(params.life_status));
  if (params.role_id !== undefined)
    query.set("role_id", String(params.role_id));

  const qs = query.toString();
  return qs ? `?${qs}` : "";
}
export const userService = {
  search(params: UserSearchParams) {
    return apiClient<PaginatedResponse<UserSearchRecordDTO>>(
      `/user-admin${buildSearchQuery(params)}`,
    );
  },

  getById(id: string) {
    return apiClient<UserDetailDTO>(`/user-admin/${id}`);
  },

  create(payload: CreateUserDTO) {
    return apiClient<UserDTO>("/user-admin", {
      method: "POST",
      body: payload,
    });
  },

  update(id: string, payload: UpdateUserDTO) {
    return apiClient<UserDTO>(`/user-admin/${id}`, {
      method: "PATCH",
      body: payload,
    });
  },

  changeLifeStatus(id: string, payload: string) {
    return apiClient<UserDTO>(`/user-admin/changeUserStatus/${id}`, {
      method: "PATCH",
      body: { status: payload },
    });
  },
};
