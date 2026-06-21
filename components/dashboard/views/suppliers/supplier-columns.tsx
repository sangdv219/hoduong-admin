import type { TableColumnsType } from "antd";

export const SUPPLIER_PRODUCT_COLUMNS: TableColumnsType<object> = [
  {
    title: "Mã sản phẩm",
    dataIndex: "code",
    key: "code",
    width: 140,
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Đơn vị tính",
    dataIndex: "unit",
    key: "unit",
    width: 120,
    align: "center" as const,
  },
  {
    title: "Giá bán",
    dataIndex: "price",
    key: "price",
    width: 120,
    align: "right" as const,
  },
  {
    title: "SL. Tối thiểu",
    dataIndex: "minQty",
    key: "minQty",
    width: 120,
    align: "right" as const,
  },
];
