"use client";

import { ROLE_COLORS } from "@/constants/colors";
import { UserDTO } from "@/types/user";
import { formatGender } from "@/utils/user-form";
import {
  DeleteOutlined,
  EditOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Button, Popconfirm, Space, Tag, Tooltip } from "antd";

interface UserColumnHandlers {
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
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  SUSPENDED: "suspended",
  ARCHIVED: "archived",
} as const;

type StatusType = (typeof Status)[keyof typeof Status];

const STATUS_CONFIG: Record<StatusType, { label: string; color: string }> = {
  [Status.ACTIVE]: { label: "Đang hoạt động", color: "#16a34a" },
  [Status.INACTIVE]: { label: "Ngừng hoạt động", color: "#dc2626" },
  [Status.PENDING]: { label: "Chờ xử lý", color: "#f59e0b" },
  [Status.SUSPENDED]: { label: "Bị đình chỉ", color: "#ef4444" },
  [Status.ARCHIVED]: { label: "Đã lưu trữ", color: "#9ca3af" },
};
const canActivate = (status: any) =>
  [Status.INACTIVE, Status.PENDING, Status.SUSPENDED].includes(status);

const canDeactivate = (status: any) => status === Status.ACTIVE;

const canSuspend = (status: any) =>
  [Status.ACTIVE, Status.INACTIVE, Status.PENDING].includes(status);

export function getUserColumns(
  handlers: UserColumnHandlers,
  sortField?: string,
  sortOrder?: "ASC" | "DESC",
): TableColumnsType<UserDTO> {
  return [
    {
      title: "",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space size={4}>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined style={{ fontSize: 20 }} />}
              onClick={() => handlers.onEdit(record.id)}
              style={{ color: "#1a7a48" }}
            />
          </Tooltip>
          {canDeactivate(record.status) && (
            <Popconfirm
              title="Tạm dừng người dùng?"
              description="Người dùng sẽ bị đánh dấu không hoạt động."
              okText="Tạm dừng"
              cancelText="Hủy"
              okButtonProps={{ danger: true }}
              onConfirm={() => handlers.onDeactivate(record.id)}
            >
              <Tooltip title="Tạm dừng">
                <Button
                  type="text"
                  size="small"
                  icon={<PauseCircleOutlined style={{ fontSize: 20 }} />}
                  loading={handlers.deactivatingId === record.id}
                  style={{ color: "#f59e0b" }}
                />
              </Tooltip>
            </Popconfirm>
          )}
          {canActivate(record.status) && (
            <Tooltip title="Kích hoạt">
              <Button
                type="text"
                size="small"
                icon={<PlayCircleOutlined style={{ fontSize: 20 }} />}
                loading={handlers.activatingId === record.id}
                onClick={() => handlers.onActivate(record.id)}
                style={{ color: "#22c55e" }}
              />
            </Tooltip>
          )}
          {canSuspend(record.status) && (
            <Popconfirm
              title="Đình chỉ người dùng?"
              description="Người dùng sẽ bị đình chỉ cho đến khi được kích hoạt lại."
              okText="Đình chỉ"
              cancelText="Hủy"
              okButtonProps={{ danger: true }}
              onConfirm={() => handlers.onSuspend(record.id)}
            >
              <Tooltip title="Đình chỉ">
                <Button
                  type="text"
                  size="small"
                  icon={<CloseCircleOutlined style={{ fontSize: 20 }} />}
                  loading={handlers.suspendingId === record.id}
                  style={{ color: "#ef4444" }}
                />
              </Tooltip>
            </Popconfirm>
          )}
        </Space>
      ),
    },
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      key: "fullname",
      render: (text: string) => (
        <span style={{ fontWeight: 500, color: "#1a1a1a" }}>{text}</span>
      ),
    },
    {
      title: "Tên khác",
      dataIndex: "other_name",
      key: "other_name",
      render: (other_name: string | null) => (
        <span style={{ fontWeight: 500, color: "#1a1a1a" }}>
          {other_name ?? "-"}
        </span>
      ),
    },

    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 120,
      render: (phone: string) => (
        <span style={{ fontWeight: 500, color: "#1a1a1a" }}>{phone}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
      render: (email: string) => (
        <span style={{ fontWeight: 500, color: "#1a1a1a" }}>{email}</span>
      ),
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      width: 100,
      render: (gender: UserDTO["gender"]) => (
        <span style={{ color: "#374151" }}>{formatGender(gender)}</span>
      ),
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
      sorter: true,
      sortOrder:
        sortField === "age"
          ? sortOrder === "ASC"
            ? "ascend"
            : "descend"
          : null,
      width: 100,
      render: (age: number) => <span style={{ color: "#374151" }}>{age}</span>,
    },
    {
      title: "Tình trạng",
      dataIndex: "life_status",
      key: "life_status",
      render: (life_status: 0 | 1) => (
        <span style={{ color: "#6b7280", fontSize: 12 }}>
          {life_status ? "Còn sống" : "Đã mất"}
        </span>
      ),
    },
    {
      title: "Vai trò",
      dataIndex: "roles",
      key: "roles",
      render: (roles: { name: string }[]) => (
        <Space size={[0, 4]} wrap>
          {roles?.map((role, index) => {
            const color = ROLE_COLORS[role.name] || "green";
            return (
              <Tag color={color} key={index} style={{ marginInlineEnd: 4 }}>
                {role.name}
              </Tag>
            );
          })}
        </Space>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
      render: (status: StatusType) => {
        const config = STATUS_CONFIG[status] ?? {
          label: "Không xác định",
          color: "#6b7280",
        };

        return (
          <span style={{ color: config.color, fontSize: 12, fontWeight: 600 }}>
            {config.label}
          </span>
        );
      },
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
