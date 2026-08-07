import { apiClient } from "@/lib/api-client";
import { PaginatedResponse } from "@/types/common";
import {
  ICreateCouplesDTO,
  ICouplesDetailDTO,
  ICouplesSearchParams,
  ICouplesSearchRecordDTO,
  IUpdateCouplesDTO,
  ICouplesDTO,
} from "@/types/couples";

function buildSearchQuery(params: ICouplesSearchParams): string {
  const query = new URLSearchParams();
  if (params.keyword !== undefined)
    query.set("keyword", String(params.keyword));
  if (params.page !== undefined) query.set("page", String(params.page));
  if (params.limit !== undefined) query.set("limit", String(params.limit));
  if (params.sortBy !== undefined) query.set("sortBy", String(params.sortBy));
  if (params.partner_1_id !== undefined)
    query.set("partner_1_id", String(params.partner_1_id));
  if (params.partner_1_id !== undefined)
    query.set("partner_1_id", String(params.partner_1_id));
  if (params.couple_order !== undefined)
    query.set("couple_order", String(params.couple_order));
  if (params.marriage_status !== undefined)
    query.set("marriage_status", String(params.marriage_status));
  if (params.divorce_date !== undefined)
    query.set("divorce_date", String(params.divorce_date));

  const qs = query.toString();
  return qs ? `?${qs}` : "";
}
export const couplesService = {
  search(params: ICouplesSearchParams) {
    return apiClient<PaginatedResponse<ICouplesSearchRecordDTO>>(
      `/couples${buildSearchQuery(params)}`,
    );
  },

  getById(id: string) {
    return apiClient<ICouplesDetailDTO>(`/couples/${id}`);
  },

  create(payload: ICreateCouplesDTO) {
    return apiClient<ICouplesDTO>("/couples", {
      method: "POST",
      body: payload,
    });
  },

  update(id: string, payload: IUpdateCouplesDTO) {
    return apiClient<ICouplesDTO>(`/couples/${id}`, {
      method: "PATCH",
      body: payload,
    });
  },
};
