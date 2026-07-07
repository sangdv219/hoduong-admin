import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { PERSON_QUERY_KEYS } from "@/constants/api";
import { ApiError } from "@/lib/api-errors";
import { personService } from "@/services/person.service";
import { usePersonFilterStore } from "@/stores/use-person-filter-store";
import type { CreatePersonDTO, UpdatePersonDTO } from "@/types/person";

function handleMutationError(error: unknown, fallback: string) {
  const msg = error instanceof ApiError ? error.message : fallback;
  message.error(msg);
}

export function usePersons() {
  const { search, page, limit } = usePersonFilterStore();

  return useQuery({
    queryKey: PERSON_QUERY_KEYS.list({ search, page, limit }),
    queryFn: () =>
      personService.search({
        q: search || undefined,
        page,
        limit,
      }),
    placeholderData: (prev) => prev,
  });
}

export function usePersonDetail(id: string | null) {
  return useQuery({
    queryKey: PERSON_QUERY_KEYS.detail(id ?? ""),
    queryFn: () => personService.getById(id!),
    enabled: !!id,
  });
}

export function useCreatePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePersonDTO) => personService.create(payload),
    onSuccess: () => {
      message.success("Thêm người dùng thành công");
      queryClient.invalidateQueries({ queryKey: PERSON_QUERY_KEYS.all });
    },
    onError: (error) => handleMutationError(error, "Không thể thêm người dùng"),
  });
}

export function useUpdatePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdatePersonDTO }) =>
      personService.update(id, payload),
    onSuccess: (_, { id }) => {
      message.success("Cập nhật người dùng thành công");
      queryClient.invalidateQueries({ queryKey: PERSON_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: PERSON_QUERY_KEYS.detail(id) });
    },
    onError: (error) => handleMutationError(error, "Không thể cập nhật người dùng"),
  });
}

export function useDeactivatePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => personService.deactivate(id),
    onSuccess: () => {
      message.success("Đã vô hiệu hóa người dùng");
      queryClient.invalidateQueries({ queryKey: PERSON_QUERY_KEYS.all });
    },
    onError: (error) => handleMutationError(error, "Không thể vô hiệu hóa người dùng"),
  });
}

export function useActivatePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => personService.activate(id),
    onSuccess: () => {
      message.success("Đã kích hoạt người dùng");
      queryClient.invalidateQueries({ queryKey: PERSON_QUERY_KEYS.all });
    },
    onError: (error) => handleMutationError(error, "Không thể kích hoạt người dùng"),
  });
}
