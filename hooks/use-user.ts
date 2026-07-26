import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { USER_QUERY_KEYS, Status } from "@/constants/api";
import { ApiError } from "@/lib/api-errors";
import { userService } from "@/services/user.service";
import type { CreateUserDTO, UpdateUserDTO } from "@/types/user";
import { useUserFilterStore } from "@/stores/use-user-filter-store";

function handleMutationError(
  error: unknown,
  fallback: string,
  messageApi: ReturnType<typeof App.useApp>["message"],
) {
  const msg = error instanceof ApiError ? error.message : fallback;

  messageApi.error(msg);
}

export function useUsers({ sortBy, sortOrder }: any) {
  const { keyword, page, limit, status, gender, life_status } =
    useUserFilterStore();
  return useQuery({
    queryKey: USER_QUERY_KEYS.list({
      keyword,
      page,
      limit,
      status,
      gender,
      life_status,
      sortBy,
      sortOrder,
    }),
    queryFn: () =>
      userService.search({
        keyword: keyword || undefined,
        page,
        limit,
        status,
        gender: gender ?? undefined,
        life_status: life_status ?? undefined,
        sortBy,
        sortOrder,
      }),
    placeholderData: (prev) => prev,
  });
}

export function useUserDetail(id: string | null) {
  return useQuery({
    queryKey: USER_QUERY_KEYS.detail(id ?? ""),
    queryFn: () => userService.getById(id!),
    enabled: !!id,
    staleTime: 1,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: (payload: CreateUserDTO) => userService.create(payload),
    onSuccess: () => {
      message.success("Thêm người dùng thành công");
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
    },
    onError: (error) =>
      handleMutationError(error, "Không thể thêm người dùng", message),
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserDTO }) =>
      userService.update(id, payload),
    onSuccess: (_, { id }) => {
      message.success("Cập nhật người dùng thành công");
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.detail(id) });
    },
    onError: (error) =>
      handleMutationError(error, "Không thể cập nhật người dùng", message),
  });
}

export function useDeactivateUser() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: (id: string) =>
      userService.changeLifeStatus(id, Status.INACTIVE),
    onSuccess: () => {
      message.success("Đã vô hiệu hóa người dùng");
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
    },
    onError: (error) =>
      handleMutationError(error, "Không thể vô hiệu hóa người dùng", message),
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: (id: string) =>
      userService.changeLifeStatus(id, Status.ARCHIVED),
    onSuccess: () => {
      message.success("Đã xoá người dùng");
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
    },
    onError: (error) =>
      handleMutationError(error, "Không thể xóa người dùng", message),
  });
}

export function useActivateUser() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (id: string) => userService.changeLifeStatus(id, Status.ACTIVE),
    onSuccess: () => {
      message.success("Đã kích hoạt người dùng");
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
    },
    onError: (error) =>
      handleMutationError(error, "Không thể kích hoạt người dùng", message),
  });
}

export function useSuspendUser() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: (id: string) =>
      userService.changeLifeStatus(id, Status.SUSPENDED),
    onSuccess: () => {
      message.success("Đã đình chỉ người dùng");
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
    },
    onError: (error) =>
      handleMutationError(error, "Không thể đình chỉ người dùng", message),
  });
}
