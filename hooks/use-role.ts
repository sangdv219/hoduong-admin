import { ROLE_QUERY_KEYS } from "@/constants/api";
import { roleService } from "@/services/role.service";
import { useUserFilterStore } from "@/stores/use-user-filter-store";
import { useQuery } from "@tanstack/react-query";

export const useRoles = () => {
  const { page = 1, limit = 100 } = useUserFilterStore();
  return useQuery({
    queryKey: ROLE_QUERY_KEYS.list({ page, limit }),
    queryFn: () => roleService.search({ page, limit }),
    // placeholderData: (prev) => prev,
  });
};
