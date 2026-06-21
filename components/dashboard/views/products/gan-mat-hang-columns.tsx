import type { TableColumnsType } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { GREEN_PRIMARY } from "@/constants/colors";
import type { GanMatHangRow } from "@/types/gan-mat-hang";

export const GAN_MAT_HANG_COLUMNS: TableColumnsType<GanMatHangRow> = [
  {
    title: "",
    key: "action",
    width: 48,
    align: "center" as const,
    render: (_: unknown, record: GanMatHangRow) =>
      record.noIcon ? null : (
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 5,
            background: "#fff1f0",
            border: "1px solid #ffccc7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            margin: "0 auto",
          }}
        >
          <DeleteOutlined style={{ fontSize: 12, color: "#cf1322" }} />
        </div>
      ),
  },
  {
    title: "Tên mặt hàng",
    dataIndex: "name",
    key: "name",
    render: (val: string, record: GanMatHangRow) => (
      <span style={{ fontWeight: record.bold ? 700 : 400, color: "#1a1a1a" }}>{val}</span>
    ),
  },
  {
    title: "ĐVT",
    dataIndex: "dvt",
    key: "dvt",
    width: 100,
    align: "center" as const,
    render: (val: string) => <span style={{ color: "#4b5563" }}>{val || "—"}</span>,
  },
  {
    title: "Giá vốn",
    dataIndex: "giavon",
    key: "giavon",
    width: 130,
    align: "right" as const,
    render: (val: string, record: GanMatHangRow) => (
      <span
        style={{
          fontWeight: record.bold ? 700 : 400,
          color: record.bold ? "#1a1a1a" : "#374151",
        }}
      >
        {val}
      </span>
    ),
  },
  {
    title: "Giá bán",
    dataIndex: "giaban",
    key: "giaban",
    width: 130,
    align: "right" as const,
    render: (val: string, record: GanMatHangRow) => (
      <span
        style={{
          fontWeight: record.bold ? 700 : 400,
          color: record.bold ? "#1a1a1a" : GREEN_PRIMARY,
        }}
      >
        {val}
      </span>
    ),
  },
];
