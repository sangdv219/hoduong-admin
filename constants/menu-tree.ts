import type { MenuToggleItem } from "@/types/menu-toggle";

export const MENU_TREE: MenuToggleItem[] = [
  {
    key: "ban-hang",
    label: "BÁN HÀNG",
    depth: 0,
    children: [
      { key: "tong-quan-m", label: "Tổng Quan", depth: 1 },
      {
        key: "mat-hang-m",
        label: "Mặt Hàng",
        depth: 1,
        expanded: true,
        children: [
          { key: "mat-hang-item-m", label: "Mặt Hàng", depth: 2 },
          { key: "thuc-don-m", label: "Thực Đơn", depth: 2 },
          { key: "bep-m", label: "Bếp", depth: 2 },
          { key: "danh-muc-m", label: "Danh Mục", depth: 2 },
          { key: "don-vi-tinh-m", label: "Đơn Vị Tính", depth: 2 },
          { key: "nhom-lua-chon-m", label: "Nhóm Lựa Chọn", depth: 2 },
          { key: "chinh-sach-gia-m", label: "Chính Sách Giá", depth: 2 },
          { key: "gan-mat-hang-m", label: "Gắn Mặt Hàng", depth: 2 },
        ],
      },
      {
        key: "chuong-trinh-m",
        label: "Chương Trình Bán Hàng",
        depth: 1,
        expanded: true,
        children: [
          { key: "khuyen-mai-m", label: "Khuyến Mãi", depth: 2 },
          { key: "phi-dich-vu-m", label: "Phí Dịch Vụ", depth: 2 },
        ],
      },
      { key: "danh-sach-hd-m", label: "Danh Sách Hoá Đơn", depth: 1 },
      { key: "hoa-don-dt-m", label: "Hoá Đơn Điện Tử", depth: 1 },
      { key: "thu-ngan-m", label: "Thu Ngân (POS)", depth: 1 },
      {
        key: "dat-ban-m",
        label: "Đặt Bàn",
        depth: 1,
        expanded: true,
        children: [
          { key: "cau-hinh-db-m", label: "Cấu Hình Đặt Bàn", depth: 2 },
          { key: "qr-ban-m", label: "QR Theo Bàn", depth: 2 },
        ],
      },
    ],
  },
  {
    key: "quan-ly-m",
    label: "QUẢN LÝ",
    depth: 0,
    children: [
      {
        key: "khach-hang-m",
        label: "Khách Hàng",
        depth: 1,
        expanded: true,
        children: [
          { key: "kh-ds-m", label: "Khách Hàng", depth: 2 },
          { key: "kh-nhom-m", label: "Nhóm Khách Hàng", depth: 2 },
        ],
      },
    ],
  },
];

export function flattenMenuTree(items: MenuToggleItem[]): MenuToggleItem[] {
  const result: MenuToggleItem[] = [];

  function walk(nodes: MenuToggleItem[]) {
    for (const node of nodes) {
      result.push(node);
      if (node.children) walk(node.children);
    }
  }

  walk(items);
  return result;
}
