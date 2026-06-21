import type { TableColumnsType } from "antd";
import { Space, Tooltip } from "antd";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
import type { CustomerDTO } from "@/types/customer";

export const CUSTOMER_COLUMNS: TableColumnsType<CustomerDTO> = [
  {
    title: "",
    key: "actions",
    width: 72,
    render: () => (
      <Space size={4}>
        <Tooltip title="Kích hoạt">
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              color: "#22c55e",
              display: "flex",
              alignItems: "center",
              lineHeight: 1,
            }}
          >
            <PlayCircleOutlined style={{ fontSize: 20 }} />
          </button>
        </Tooltip>
        <Tooltip title="Tạm dừng">
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              color: "#f59e0b",
              display: "flex",
              alignItems: "center",
              lineHeight: 1,
            }}
          >
            <PauseCircleOutlined style={{ fontSize: 20 }} />
          </button>
        </Tooltip>
      </Space>
    ),
  },
  {
    title: "Tên khách hàng",
    dataIndex: "name",
    key: "name",
    render: (text: string) => (
      <span style={{ fontWeight: 500, color: "#1a1a1a" }}>{text}</span>
    ),
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone",
    render: (text: string) => (
      <span style={{ color: text ? "#374151" : "#bfbfbf", fontVariantNumeric: "tabular-nums" }}>
        {text || "—"}
      </span>
    ),
  },
  {
    title: "Điểm tích lũy",
    dataIndex: "points",
    key: "points",
    align: "right",
    render: (v: string) => (
      <span style={{ fontVariantNumeric: "tabular-nums", color: "#374151" }}>{v}</span>
    ),
  },
  {
    title: "Tổng đơn hàng",
    dataIndex: "orders",
    key: "orders",
    align: "right",
    render: (v: string) => (
      <span style={{ fontVariantNumeric: "tabular-nums", color: "#374151" }}>{v}</span>
    ),
  },
  {
    title: "Chi tiêu",
    dataIndex: "spent",
    key: "spent",
    align: "right",
    render: (v: string) => (
      <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 500, color: "#111" }}>
        {v}
      </span>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: (status: CustomerDTO["status"]) =>
      status === "active" ? (
        <span style={{ color: "#16a34a", fontWeight: 600, fontSize: 12 }}>Đang hoạt động</span>
      ) : (
        <span style={{ color: "#dc2626", fontWeight: 600, fontSize: 12 }}>Ngừng hoạt động</span>
      ),
  },
];
