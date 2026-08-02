"use client";

import { FamilyMembersDTO } from "@/types/family-members";
import { IUser } from "@/types/user";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Button, Popconfirm, Space, Tag, Tooltip } from "antd";

interface FamilyMemberColumnHandlers {
  onEdit: (id: string) => void;
  onDeactivate: (id: string) => void;
  onActivate: (id: string) => void;
  onDelete: (id: string) => void;
  onSuspend: (id: string) => void;
  activatingId?: string | null;
  deactivatingId?: string | null;
  suspendingId?: string | null;
}

const Status = {
  MARRIED: "MARRIED",
  DIVORCED: "DIVORCED",
  WIDOWED: "WIDOWED",
} as const;

type MarriedStatusType = (typeof Status)[keyof typeof Status];

const MERRIED_STATUS_CONFIG: Record<
  MarriedStatusType,
  { label: string; color: string }
> = {
  [Status.MARRIED]: { label: "Đã kết hôn", color: "#16a34a" },
  [Status.DIVORCED]: { label: "Đã ly hôn", color: "#dc2626" },
  [Status.WIDOWED]: { label: "Goá phụ", color: "#f59e0b" },
};

const formatDate = (date: string | Date): string => {
  const d = new Date(date);

  const pad = (n: number) => String(n).padStart(2, "0");

  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

export function getFamilyMemberColumns(
  handlers: FamilyMemberColumnHandlers,
  sortField?: string,
  sortOrder?: "ASC" | "DESC",
): TableColumnsType<FamilyMembersDTO> {
  return [
    {
      title: "",
      key: "actions",
      width: 40,
      render: (_, record) => (
        <Space size={4}>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              size="small"
              icon={<FormOutlined style={{ fontSize: 20 }} />}
              onClick={() => handlers.onEdit(record.id)}
              style={{ color: "#1a7a48" }}
            />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "Họ và tên",
      dataIndex: "user",
      key: "user",
      render: (user: IUser) => {
        console.log("user", user);
        return (
          <span style={{ fontWeight: 500, color: "#1a1a1a" }}>
            {user.fullname}
          </span>
        );
      },
    },
    {
      title: "Thứ tự con",
      dataIndex: "child_order",
      key: "child_order",
      align: "center",
      sorter: true,
      sortOrder:
        sortField === "child_order"
          ? sortOrder === "ASC"
            ? "ascend"
            : "descend"
          : null,
      width: 100,
      render: (child_order: number) => (
        <span style={{ fontWeight: 500, color: "#1a1a1a" }}>{child_order}</span>
      ),
    },

    {
      title: "Thứ tự thế hệ",
      dataIndex: "generation_order",
      key: "generation_order",
      align: "center",
      width: 120,
      sorter: true,
      sortOrder:
        sortField === "generation_order"
          ? sortOrder === "ASC"
            ? "ascend"
            : "descend"
          : null,
      render: (generation_order: number) => (
        <span style={{ fontWeight: 500, color: "#1a1a1a" }}>
          {generation_order}
        </span>
      ),
    },
    {
      title: "Tên cha",
      dataIndex: "father",
      key: "father",
      width: 200,
      render: (father: any) => (
        <span style={{ fontWeight: 500, color: "#1a1a1a" }}>
          {father?.user.fullname ?? "-"}
        </span>
      ),
    },
    {
      title: "Tên vợ",
      dataIndex: "wife",
      key: "wife",
      width: 200,
      render: (wife: { fullname: string }[]) => (
        <Space size={[0, 4]} wrap>
          {wife?.map((i, index) => {
            return (
              <Tag color={"volcano"} key={index} style={{ marginInlineEnd: 4 }}>
                {i?.fullname}
              </Tag>
            );
          })}
        </Space>
      ),
    },
    {
      title: "Tình trạng hôn nhân",
      dataIndex: "wife",
      key: "wife",
      width: 200,
      render: (
        wife: {
          info: { marriage_status: "MARRIED" | "DIVORCED" | "WIDOWED" };
        }[],
      ) => (
        <Space size={[0, 4]} wrap>
          {wife?.map((i, index) => {
            const config = MERRIED_STATUS_CONFIG[i.info.marriage_status] ?? {
              label: "Không xác định",
              color: "#6b7280",
            };
            return (
              <Tag
                color={config.color}
                key={index}
                style={{ marginInlineEnd: 4 }}
              >
                {MERRIED_STATUS_CONFIG[i.info.marriage_status].label}
              </Tag>
            );
          })}
        </Space>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      sorter: true,
      sortOrder:
        sortField === "created_at"
          ? sortOrder === "ASC"
            ? "ascend"
            : "descend"
          : null,
      render: (created_at: string) => (
        <span style={{ color: "#374151" }}>{formatDate(created_at)}</span>
      ),
    },
    {
      title: "",
      key: "delete",
      width: 48,
      align: "center",
      render: (_, record) => (
        <Popconfirm
          title="Xóa người dùng?"
          description="Hành động này sẽ đưa người dùng vào hệ thống rác."
          okText="Xóa"
          cancelText="Hủy"
          okButtonProps={{ danger: true }}
          onConfirm={() => handlers.onDelete(record.id)}
        >
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined style={{ fontSize: 20 }} />}
            loading={handlers.deactivatingId === record.id}
          />
        </Popconfirm>
      ),
    },
  ];
}
