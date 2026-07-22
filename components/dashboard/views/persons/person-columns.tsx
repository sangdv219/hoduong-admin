"use client";

import type { PersonDTO } from "@/types/person";
import { formatGender } from "@/utils/person";
import {
  DeleteOutlined,
  EditOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Button, Popconfirm, Space, Tooltip } from "antd";

interface PersonColumnHandlers {
  onEdit: (id: string) => void;
  onDeactivate: (id: string) => void;
  onActivate: (id: string) => void;
  onDelete: (id: string) => void;
  activatingId?: string | null;
  deactivatingId?: string | null;
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
  [Status.ACTIVE]: { label: "Kích hoạt", color: "#10b981" },
  [Status.INACTIVE]: { label: "Tạm dừng", color: "#6b7280" },
  [Status.PENDING]: { label: "Chờ xử lý", color: "#f59e0b" },
  [Status.SUSPENDED]: { label: "Tạm dừng", color: "#ef4444" },
  [Status.ARCHIVED]: { label: "Đã lưu trữ", color: "#9ca3af" },
};
const canActivate = (status: any) => {
  return (
    status === Status.INACTIVE ||
    status === Status.PENDING ||
    status === Status.SUSPENDED
  );
};

const canInActivate = (status: any) => status === Status.ACTIVE;

export function getPersonColumns(
  handlers: PersonColumnHandlers,
): TableColumnsType<PersonDTO> {
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
              icon={<EditOutlined />}
              onClick={() => handlers.onEdit(record.id)}
              style={{ color: "#1a7a48" }}
            />
          </Tooltip>
          {canInActivate(record.status) && (
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
                  icon={<PauseCircleOutlined />}
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
                icon={<PlayCircleOutlined />}
                loading={handlers.activatingId === record.id}
                onClick={() => handlers.onActivate(record.id)}
                style={{ color: "#22c55e" }}
              />
            </Tooltip>
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
      width: 200,
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
      render: (gender: PersonDTO["gender"]) => (
        <span style={{ color: "#374151" }}>{formatGender(gender)}</span>
      ),
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
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
          <span style={{ color: config.color, fontSize: 12 }}>
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
          description="Hành động này sẽ Tạm dừng người dùng trên hệ thống."
          okText="Xóa"
          cancelText="Hủy"
          okButtonProps={{ danger: true }}
          onConfirm={() => handlers.onDelete(record.id)}
        >
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            loading={handlers.deactivatingId === record.id}
          />
        </Popconfirm>
      ),
    },
  ];
}
