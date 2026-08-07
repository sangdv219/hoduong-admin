import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { USER_QUERY_KEYS, Status, COUPLES_QUERY_KEYS } from "@/constants/api";
import { ApiError } from "@/lib/api-errors";
import { couplesService } from "@/services/couples.service";
import type { ICreateCouplesDTO, IUpdateCouplesDTO } from "@/types/couples";
import { useCouplesFilterStore } from "@/stores/use-couples-filter-store";

function handleMutationError(
  error: unknown,
  fallback: string,
  messageApi: ReturnType<typeof App.useApp>["message"],
) {
  const msg = error instanceof ApiError ? error.message : fallback;

  messageApi.error(msg);
}

export function useCouples({ sortBy, sortOrder }: any) {
  const {
    keyword,
    page,
    limit,
    partner_1_id,
    partner_2_id,
    couple_order,
    marriage_status,
    divorce_date,
  } = useCouplesFilterStore();
  return useQuery({
    queryKey: COUPLES_QUERY_KEYS.list({
      keyword,
      page,
      limit,
      sortBy,
      sortOrder,
      partner_1_id,
      partner_2_id,
      couple_order,
      marriage_status,
      divorce_date,
    }),
    queryFn: () =>
      couplesService.search({
        keyword: keyword || undefined,
        page,
        limit,
        sortBy,
        sortOrder,
        partner_1_id,
        partner_2_id,
        couple_order,
        marriage_status,
        divorce_date,
      }),
    placeholderData: (prev) => prev,
  });
}

export function useCoupleDetail(id: string | null) {
  return useQuery({
    queryKey: USER_QUERY_KEYS.detail(id ?? ""),
    queryFn: () => couplesService.getById(id!),
    enabled: !!id,
    staleTime: 1,
  });
}

export function useCreateCouple() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: (payload: ICreateCouplesDTO) => couplesService.create(payload),
    onSuccess: () => {
      message.success("Thêm người dùng thành công");
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
    },
    onError: (error) =>
      handleMutationError(error, "Không thể thêm người dùng", message),
  });
}

export function useUpdateCouple() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: IUpdateCouplesDTO }) =>
      couplesService.update(id, payload),
    onSuccess: (_, { id }) => {
      message.success("Cập nhật người dùng thành công");
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.detail(id) });
    },
    onError: (error) =>
      handleMutationError(error, "Không thể cập nhật người dùng", message),
  });
}

// export function useDeleteCouple() {
//   const queryClient = useQueryClient();
//   const { message } = App.useApp();

//   return useMutation({
//     mutationFn: (id: string) =>
//       couplesService.changeLifeStatus(id, Status.ARCHIVED),
//     onSuccess: () => {
//       message.success("Đã xoá người dùng");
//       queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
//     },
//     onError: (error) =>
//       handleMutationError(error, "Không thể xóa người dùng", message),
//   });
// }
