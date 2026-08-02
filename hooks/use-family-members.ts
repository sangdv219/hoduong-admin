import { FAMILY_MEMBERS_QUERY_KEYS, Status } from "@/constants/api";
import { ApiError } from "@/lib/api-errors";
import { familyMembersService } from "@/services/family-members.service";
import { useFamilyMembersFilterStore } from "@/stores/use-family-members-filter-store";
import {
  CreateFamilyMembersDTO,
  UpdateFamilyMembersDTO,
} from "@/types/family-members";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";

function handleMutationError(
  error: unknown,
  fallback: string,
  messageApi: ReturnType<typeof App.useApp>["message"],
) {
  const msg = error instanceof ApiError ? error.message : fallback;

  messageApi.error(msg);
}

export function useFamilyMembers({ sortBy, sortOrder }: any) {
  const { keyword, page, limit, status, gender, life_status, roleId } =
    useFamilyMembersFilterStore();
  return useQuery({
    queryKey: FAMILY_MEMBERS_QUERY_KEYS.list({
      keyword,
      page,
      limit,
      status,
      gender,
      life_status,
      sortBy,
      sortOrder,
      roleId,
    }),
    queryFn: () =>
      familyMembersService.search({
        keyword: keyword || undefined,
        page,
        limit,
        status,
        gender: gender ?? undefined,
        life_status: life_status ?? undefined,
        sortBy,
        sortOrder,
        role_id: roleId,
      }),
    placeholderData: (prev) => prev,
  });
}

export function useFamilyMembersDetail(id: string | null) {
  return useQuery({
    queryKey: FAMILY_MEMBERS_QUERY_KEYS.detail(id ?? ""),
    queryFn: () => familyMembersService.getById(id!),
    enabled: !!id,
    staleTime: 1,
  });
}

export function useCreateFamilyMembers() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: (payload: CreateFamilyMembersDTO) =>
      familyMembersService.create(payload),
    onSuccess: () => {
      message.success("Thêm thành viên gia đình thành công");
      queryClient.invalidateQueries({
        queryKey: FAMILY_MEMBERS_QUERY_KEYS.all,
      });
    },
    onError: (error) =>
      handleMutationError(error, "Không thể thêm thành viên gia đình", message),
  });
}

export function useUpdateFamilyMembers() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateFamilyMembersDTO;
    }) => familyMembersService.update(id, payload),
    onSuccess: (_, { id }) => {
      message.success("Cập nhật thành viên gia đình thành công");
      queryClient.invalidateQueries({
        queryKey: FAMILY_MEMBERS_QUERY_KEYS.all,
      });
      queryClient.invalidateQueries({
        queryKey: FAMILY_MEMBERS_QUERY_KEYS.detail(id),
      });
    },
    onError: (error) =>
      handleMutationError(
        error,
        "Không thể cập nhật thành viên gia đình",
        message,
      ),
  });
}

export function useDeactivateFamilyMembers() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: (id: string) =>
      familyMembersService.changeLifeStatus(id, Status.INACTIVE),
    onSuccess: () => {
      message.success("Đã vô hiệu hóa thành viên gia đình");
      queryClient.invalidateQueries({
        queryKey: FAMILY_MEMBERS_QUERY_KEYS.all,
      });
    },
    onError: (error) =>
      handleMutationError(
        error,
        "Không thể vô hiệu hóa thành viên gia đình",
        message,
      ),
  });
}

export function useDeleteFamilyMembers() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: (id: string) =>
      familyMembersService.changeLifeStatus(id, Status.ARCHIVED),
    onSuccess: () => {
      message.success("Đã xoá thành viên gia đình");
      queryClient.invalidateQueries({
        queryKey: FAMILY_MEMBERS_QUERY_KEYS.all,
      });
    },
    onError: (error) =>
      handleMutationError(error, "Không thể xóa thành viên gia đình", message),
  });
}

export function useActivateFamilyMembers() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  return useMutation({
    mutationFn: (id: string) =>
      familyMembersService.changeLifeStatus(id, Status.ACTIVE),
    onSuccess: () => {
      message.success("Đã kích hoạt thành viên gia đình");
      queryClient.invalidateQueries({
        queryKey: FAMILY_MEMBERS_QUERY_KEYS.all,
      });
    },
    onError: (error) =>
      handleMutationError(
        error,
        "Không thể kích hoạt thành viên gia đình",
        message,
      ),
  });
}

export function useSuspendFamilyMembers() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: (id: string) =>
      familyMembersService.changeLifeStatus(id, Status.SUSPENDED),
    onSuccess: () => {
      message.success("Đã đình chỉ thành viên gia đình");
      queryClient.invalidateQueries({
        queryKey: FAMILY_MEMBERS_QUERY_KEYS.all,
      });
    },
    onError: (error) =>
      handleMutationError(
        error,
        "Không thể đình chỉ thành viên gia đình",
        message,
      ),
  });
}
