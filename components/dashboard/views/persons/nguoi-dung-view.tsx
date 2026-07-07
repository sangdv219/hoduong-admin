"use client";

import { useMemo, useState } from "react";
import { Button, Input, Select, Table, TableColumnsType, Tooltip } from "antd";
import {
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { GREEN_PRIMARY, SURFACE_BG } from "@/constants/colors";
import { PageTitleBar } from "@/components/dashboard/shared/page-title-bar";
import {
  useActivatePerson,
  useDeactivatePerson,
  usePersons,
} from "@/hooks/use-persons";
import { usePersonFilterStore } from "@/stores/use-person-filter-store";
import { PersonFormModal } from "./person-form-modal";
import { getPersonColumns } from "./person-columns";
import { PersonSearchRecordDTO } from "@/types/person";

export function NguoiDungView() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [localSearch, setLocalSearch] = useState("");

  const { search, page, limit, setSearch, setPage, reset } =
    usePersonFilterStore();
  const { data, isLoading, isFetching, refetch, error } = usePersons();
  const deactivateMutation = useDeactivatePerson();
  const activateMutation = useActivatePerson();

  const columns = useMemo(
    () =>
      getPersonColumns({
        onEdit: (id) => {
          setEditingId(id);
          setModalOpen(true);
        },
        onDeactivate: (id) => deactivateMutation.mutate(id),
        onActivate: (id) => activateMutation.mutate(id),
        activatingId: activateMutation.isPending
          ? activateMutation.variables
          : null,
        deactivatingId: deactivateMutation.isPending
          ? deactivateMutation.variables
          : null,
      }),
    [activateMutation, deactivateMutation],
  );

  function handleSearch() {
    setSearch(localSearch);
  }

  function handleAdd() {
    setEditingId(null);
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
    setEditingId(null);
  }

  return (
    <>
      <PageTitleBar
        title="Quản lý người dùng"
        actions={
          <Button
            type="primary"
            icon={<PlusOutlined />}
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
            Thêm người dùng
          </Button>
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
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onPressEnter={handleSearch}
            prefix={<SearchOutlined style={{ color: "#9ca3af" }} />}
            placeholder="Tìm theo tên người dùng..."
            style={{ width: 300, height: 34, borderRadius: 6, fontSize: 13 }}
            allowClear
            onClear={() => {
              setLocalSearch("");
              setSearch("");
            }}
          />

          <Button type="primary" onClick={handleSearch} style={{ height: 34 }}>
            Tìm kiếm
          </Button>

          <Select
            placeholder="Trạng thái"
            style={{ width: 170, height: 34 }}
            allowClear
            options={[
              { value: "active", label: "Đang hoạt động" },
              { value: "inactive", label: "Ngừng hoạt động" },
            ]}
            disabled
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

          {(search || page > 1) && (
            <Button
              type="link"
              onClick={() => {
                reset();
                setLocalSearch("");
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
            Không thể tải danh sách người dùng. Kiểm tra kết nối API tại{" "}
            <code>/api/v1/user-admin</code>.
          </div>
        )}

        <div
          style={{
            background: SURFACE_BG,
            borderRadius: 8,
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            overflow: "hidden",
          }}
        >
          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: (keys) => setSelectedRowKeys(keys),
            }}
            columns={
              columns as unknown as TableColumnsType<PersonSearchRecordDTO>
            }
            dataSource={data?.records?.data ?? ([] as PersonSearchRecordDTO[])}
            loading={isLoading}
            pagination={{
              current: page,
              pageSize: limit,
              total: data?.totalRecord ?? 0,
              showSizeChanger: false,
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
        </div>
      </div>

      <PersonFormModal
        open={modalOpen}
        personId={editingId}
        onClose={handleCloseModal}
      />
    </>
  );
}
