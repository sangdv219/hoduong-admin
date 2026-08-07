import { apiClient } from "@/lib/api-client";
import { PaginatedResponse } from "@/types/common";
import {
  ICreateFamilyMembersDTO,
  IFamilyMembersDetailDTO,
  IFamilyMembersDTO,
  IFamilyMembersSearchParams,
  IFamilyMembersSearchRecordDTO,
  IUpdateFamilyMembersDTO,
} from "@/types/family-members";

function buildSearchQuery(params: IFamilyMembersSearchParams): string {
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
export const familyMembersService = {
  search(params: IFamilyMembersSearchParams) {
    return apiClient<PaginatedResponse<IFamilyMembersSearchRecordDTO>>(
      `/family-members${buildSearchQuery(params)}`,
    );
  },

  getById(id: string) {
    return apiClient<IFamilyMembersDetailDTO>(`/family-members/${id}`);
  },

  create(payload: ICreateFamilyMembersDTO) {
    return apiClient<IFamilyMembersDTO>("/family-members", {
      method: "POST",
      body: payload,
    });
  },

  update(id: string, payload: IUpdateFamilyMembersDTO) {
    return apiClient<IFamilyMembersDTO>(`/family-members/${id}`, {
      method: "PATCH",
      body: payload,
    });
  },

  changeLifeStatus(id: string, payload: string) {
    return apiClient<IFamilyMembersDTO>(
      `/family-members/changeFamilyMembersStatus/${id}`,
      {
        method: "PATCH",
        body: { status: payload },
      },
    );
  },
};
