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
  activatingId?: string | null;
  deactivatingId?: string | null;
}

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
          <Popconfirm
            title="Vô hiệu hóa người dùng?"
            description="Người dùng sẽ bị đánh dấu không hoạt động."
            okText="Vô hiệu hóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
            onConfirm={() => handlers.onDeactivate(record.id)}
          >
            <Tooltip title="Vô hiệu hóa">
              <Button
                type="text"
                size="small"
                icon={<PauseCircleOutlined />}
                loading={handlers.deactivatingId === record.id}
                style={{ color: "#f59e0b" }}
              />
            </Tooltip>
          </Popconfirm>
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
      title: "Trạng thái",
      dataIndex: "is_active",
      key: "is_active",
      // ellipsis: true,
      render: (is_active: boolean) => (
        <span style={{ color: "#6b7280", fontSize: 12 }}>
          {is_active ? "Hoạt động" : "Vô hiệu hóa"}
        </span>
      ),
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
      render: (status: boolean) => (
        <span style={{ color: "#6b7280", fontSize: 12 }}>
          {status ? "Còn sống" : "Đã mất"}
        </span>
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
          description="Hành động này sẽ vô hiệu hóa người dùng trên hệ thống."
          okText="Xóa"
          cancelText="Hủy"
          okButtonProps={{ danger: true }}
          onConfirm={() => handlers.onDeactivate(record.id)}
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
