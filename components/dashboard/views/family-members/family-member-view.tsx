"use client";

import { PageTitleBar } from "@/components/dashboard/shared/page-title-bar";
import {
  GREEN_PRIMARY,
  HEADER_BG,
  RED_PRIMARY,
  SURFACE_BG,
} from "@/constants/colors";
import { useRoles } from "@/hooks/use-role";
import {
  useActivateUser,
  useDeactivateUser,
  useDeleteUser,
  useSuspendUser,
  useUsers,
} from "@/hooks/use-user";
import { useUserFilterStore } from "@/stores/use-user-filter-store";
import {
  ReloadOutlined,
  SearchOutlined,
  UserAddOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import {
  Button,
  Flex,
  Input,
  Select,
  Spin,
  Table,
  TableColumnsType,
  TableProps,
  Tooltip,
} from "antd";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { DeleteConfirmModal } from "../../shared/delete-confirm-modal";
import { getFamilyMemberColumns } from "./family-columns";
import { useFamilyMembers } from "@/hooks/use-family-members";
import { useFamilyMembersFilterStore } from "@/stores/use-family-members-filter-store";
import { FamilyMembersFormModal } from "./family-members-form-modal";
import { IFamilyMembersSearchRecordDTO } from "@/types/family-members";

export function FamilyMemberView() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | undefined>();

  // State quản lý Modal Xác nhận Xóa
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingIds, setDeletingIds] = useState<React.Key[]>([]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    keyword,
    page,
    limit,
    status,
    gender,
    life_status,
    roleId,
    setKeyword,
    setPage,
    reset,
    setStatus,
    setLimit,
    setGender,
    setLifeStatus,
    setRoleId,
  } = useFamilyMembersFilterStore();

  const { data: rolesData, isLoading: isLoadingRoles } = useRoles();

  const { data, isLoading, isFetching, refetch, error } = useFamilyMembers({
    sortBy: sortField,
    sortOrder: sortOrder,
  });

  const deactivateMutation = useDeactivateUser();
  const activateMutation = useActivateUser();
  const deleteMutation = useDeleteUser();
  const suspendMutation = useSuspendUser();

  const [searchText, setSearchText] = useState(keyword);

  // Sync state từ query params khi mount
  useEffect(() => {
    const urlPage = searchParams.get("page");
    const urlKeyword = searchParams.get("keyword");
    const urlStatus = searchParams.get("status") as any;
    const urlGender = searchParams.get("gender");
    const urlLifeStatus = searchParams.get("life_status");
    const urlSortField = searchParams.get("sortField");
    const urlSortOrder = searchParams.get("sortOrder") as any;

    if (urlPage) setPage(Number(urlPage));
    if (urlKeyword) setKeyword(urlKeyword);
    if (urlStatus) setStatus(urlStatus);
    if (urlGender) setGender(Number(urlGender));
    if (urlLifeStatus) setLifeStatus(Number(urlLifeStatus));
    if (urlSortField) setSortField(urlSortField);
    if (urlSortOrder) setSortOrder(urlSortOrder);
  }, []);

  // Đồng bộ state filter lên URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (page > 1) params.set("page", page.toString());
    if (limit && limit !== 10) params.set("limit", limit.toString());
    if (keyword) params.set("keyword", keyword);
    if (status) params.set("status", status);
    if (gender !== undefined) params.set("gender", gender.toString());
    if (life_status !== undefined)
      params.set("life_status", life_status.toString());
    if (sortField) params.set("sortField", sortField);
    if (sortOrder) params.set("sortOrder", sortOrder);

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.replace(newUrl, { scroll: false });
  }, [
    limit,
    page,
    keyword,
    status,
    gender,
    life_status,
    sortField,
    sortOrder,
    pathname,
    router,
  ]);

  const debounceSearch = useMemo(
    () =>
      debounce((value: string) => {
        setKeyword(value);
        setPage(1);
      }, 500),
    [setKeyword, setPage],
  );

  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  }, [debounceSearch]);

  // Xử lý Xóa đơn lẻ khi click nút xóa trong từng dòng của Bảng
  const handleSingleDeleteClick = (id: string) => {
    setDeletingIds([id]);
    setDeleteModalOpen(true);
  };

  // Xử lý Xóa nhiều dòng từ Nút Xóa ở Header
  const handleBatchDeleteClick = () => {
    if (selectedRowKeys.length === 0) return;
    setDeletingIds(selectedRowKeys);
    setDeleteModalOpen(true);
  };

  // Tìm tên người dùng nếu chỉ thực hiện xóa 1 dòng
  const singleDeletingUser = useMemo(() => {
    if (deletingIds.length === 1) {
      return data?.items?.find((user: any) => user.id === deletingIds[0]);
    }
    return null;
  }, [deletingIds, data?.items]);

  const columns = useMemo(
    () =>
      getFamilyMemberColumns(
        {
          onEdit: (id) => {
            setEditingId(id);
            setModalOpen(true);
          },
          onDelete: (id) => deleteMutation.mutate(id),
          onDeactivate: (id) => deactivateMutation.mutate(id),
          onActivate: (id) => activateMutation.mutate(id),
          onSuspend: (id) => suspendMutation.mutate(id),
          activatingId: activateMutation.isPending
            ? activateMutation.variables
            : null,
          deactivatingId: deactivateMutation.isPending
            ? deactivateMutation.variables
            : null,
        },
        sortField,
        sortOrder,
      ),
    [
      activateMutation.isPending,
      activateMutation.variables,
      deactivateMutation.isPending,
      deactivateMutation.variables,
      sortField,
      sortOrder,
    ],
  );

  function handleSearch() {
    setPage(1);
  }

  const handleStatusChange = (
    value?: "suspended" | "pending" | "inactive" | "active",
  ) => {
    setStatus(value);
    setPage(1);
  };

  const handleGenderChange = (value?: number) => {
    setGender(value === undefined ? undefined : value);
  };

  const handleLifeStatusChange = (value?: number) => {
    setLifeStatus(value === undefined ? undefined : value);
  };

  function handleAdd() {
    setEditingId(null);
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
    setEditingId(null);
  }

  const handleRoleChange = (value?: string) => {
    setRoleId(value === undefined ? undefined : value);
  };

  const handleTableChange: TableProps<IFamilyMembersSearchRecordDTO>["onChange"] =
    (pagination, filters, sorter) => {
      if (pagination.pageSize && pagination.pageSize !== limit) {
        setLimit(pagination.pageSize);
        setPage(1);
        return;
      }

      if (pagination.current && pagination.current !== page) {
        setPage(pagination.current);
      }

      if (!Array.isArray(sorter)) {
        if (sorter.order) {
          setSortField(sorter.field as string);
          setSortOrder(sorter.order === "ascend" ? "ASC" : "DESC");
        } else {
          setSortField(undefined);
          setSortOrder(undefined);
        }
      }
    };

  const handleConfirmDelete = async () => {
    try {
      for (const id of deletingIds) {
        await deleteMutation.mutateAsync(id as string);
      }
      setDeleteModalOpen(false);
      // Loại bỏ các key đã xóa khỏi danh sách được chọn
      setSelectedRowKeys((prevKeys) =>
        prevKeys.filter((key) => !deletingIds.includes(key)),
      );
      setDeletingIds([]);
    } catch (error) {
      console.error("Xóa thất bại:", error);
    }
  };

  return (
    <>
      <PageTitleBar
        title="Quản lý phả hệ"
        actions={
          <>
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={handleAdd}
              style={{
                background: GREEN_PRIMARY,
                borderColor: GREEN_PRIMARY,
                fontWeight: 600,
                fontSize: 13,
                height: 34,
                paddingLeft: 16,
                paddingRight: 16,
                boxShadow: `0 2px 6px ${GREEN_PRIMARY}55`,
              }}
            >
              Thêm
            </Button>
            <Button
              type="primary"
              icon={<UsergroupDeleteOutlined />}
              disabled={selectedRowKeys.length === 0}
              onClick={handleBatchDeleteClick}
              style={{
                background: RED_PRIMARY,
                borderColor: RED_PRIMARY,
                fontWeight: 600,
                fontSize: 13,
                height: 34,
                paddingLeft: 16,
                paddingRight: 16,
                boxShadow: `0 2px 6px ${RED_PRIMARY}55`,
                opacity: selectedRowKeys.length === 0 ? 0.6 : 1,
              }}
            >
              Xoá{" "}
              {selectedRowKeys.length > 0 ? `(${selectedRowKeys.length})` : ""}
            </Button>
          </>
        }
      />

      <div
        style={{
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            background: SURFACE_BG,
            borderRadius: 8,
            padding: "14px 18px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <Input
            value={searchText}
            onChange={(e) => {
              const value = e.target.value;
              setSearchText(value);
              debounceSearch(value);
            }}
            onPressEnter={handleSearch}
            prefix={<SearchOutlined style={{ color: "#9ca3af" }} />}
            placeholder="Tìm theo tên, sdt, email người dùng..."
            style={{ width: 300, height: 34, borderRadius: 6, fontSize: 13 }}
            allowClear
            onClear={() => {
              setSearchText("");
              debounceSearch.cancel();
              setKeyword("");
              setPage(1);
            }}
          />

          <Select
            placeholder="Trạng thái"
            style={{ width: 170, height: 34 }}
            allowClear
            value={status}
            onChange={handleStatusChange}
            options={[
              { value: "active", label: "Đang hoạt động" },
              { value: "inactive", label: "Ngừng hoạt động" },
              { value: "pending", label: "Chờ xử lý" },
              { value: "suspended", label: "Bị đình chỉ" },
            ]}
          />
          <Select
            placeholder="Giới tính"
            style={{ width: 170, height: 34 }}
            allowClear
            value={gender}
            onChange={handleGenderChange}
            options={[
              { value: 0, label: "Nam" },
              { value: 1, label: "Nữ" },
            ]}
          />
          <Select
            placeholder="Tình trạng"
            style={{ width: 170, height: 34 }}
            allowClear
            value={life_status}
            onChange={handleLifeStatusChange}
            options={[
              { value: 0, label: "Đã mất" },
              { value: 1, label: "Còn sống" },
            ]}
          />
          <Select
            placeholder="Vai trò"
            style={{ width: 170, height: 34 }}
            allowClear
            loading={isLoadingRoles}
            value={roleId}
            onChange={handleRoleChange}
            options={
              rolesData?.items?.map((role: any) => ({
                value: role.id,
                label: role.name,
              })) || []
            }
          />

          <Tooltip title="Làm mới">
            <Button
              icon={<ReloadOutlined />}
              shape="circle"
              onClick={() => refetch()}
              loading={isFetching}
              style={{
                width: 34,
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6b7280",
                borderColor: "#d1d5db",
                flexShrink: 0,
              }}
            />
          </Tooltip>

          {(keyword || status || page > 1) && (
            <Button
              type="link"
              onClick={() => {
                reset();
                setSearchText("");
              }}
              style={{ fontSize: 13 }}
            >
              Xóa bộ lọc
            </Button>
          )}
        </div>

        {error && (
          <div
            style={{
              background: "#fff1f0",
              border: "1px solid #ffccc7",
              borderRadius: 8,
              padding: "12px 16px",
              color: "#cf1322",
              fontSize: 13,
            }}
          >
            {error instanceof Error
              ? `Không thể tải danh sách người dùng: ${error.message}`
              : "Đã có lỗi xảy ra khi tải danh sách người dùng. Vui lòng thử lại sau."}
            <Button type="primary" onClick={() => refetch()}>
              Thử lại
            </Button>
          </div>
        )}

        <div
          style={{
            background: HEADER_BG,
            borderRadius: 8,
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            overflow: "hidden",
          }}
        >
          {isLoading ? (
            <Flex justify="center" align="center" style={{ padding: "40px 0" }}>
              <Spin size="large" />
            </Flex>
          ) : (
            <Table
              rowSelection={{
                selectedRowKeys,
                onChange: (keys) => setSelectedRowKeys(keys),
              }}
              onChange={handleTableChange}
              columns={
                columns as unknown as TableColumnsType<IFamilyMembersSearchRecordDTO>
              }
              dataSource={
                data?.items ?? ([] as IFamilyMembersSearchRecordDTO[])
              }
              loading={isLoading}
              pagination={{
                current: page,
                pageSize: limit,
                total: data?.totalRecord ?? 0,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50", "100"],
                onChange: (nextPage) => setPage(nextPage),
                showTotal: (total) => (
                  <span style={{ fontSize: 12, color: "#6b7280" }}>
                    Tổng {total} người dùng
                  </span>
                ),
                style: { padding: "10px 16px", margin: 0 },
              }}
              size="small"
              rowKey="id"
              style={{ fontSize: 13 }}
              rowClassName={(_, index) =>
                index % 2 === 0 ? "row-even" : "row-odd"
              }
              locale={{ emptyText: "Chưa có người dùng nào" }}
            />
          )}
        </div>
      </div>

      {/* Modal Thêm/Sửa */}
      <FamilyMembersFormModal
        open={modalOpen}
        familyMembersId={editingId}
        onClose={handleCloseModal}
      />

      {/* Modal Xác nhận Xóa Dùng Chung */}
      <DeleteConfirmModal
        open={deleteModalOpen}
        selectedCount={deletingIds.length}
        // itemName={"ád"}
        // itemName={singleDeletingUser?.fullname}
        entityName="người dùng"
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={deleteMutation.isPending}
      />
    </>
  );
}
