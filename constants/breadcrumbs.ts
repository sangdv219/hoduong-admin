import type { ViewKey, ViewMeta } from "@/types/dashboard";

export const VIEW_META: Record<ViewKey, ViewMeta> = {
  "cau-hinh-dat-ban": {
    breadcrumb: [
      { label: "Quản lý" },
      { label: "Đặt Bàn" },
      { label: "Cấu hình đặt bàn", active: true },
    ],
    title: "CẤU HÌNH WEBSITE",
  },
  "khach-hang-thanh-vien": {
    breadcrumb: [
      { label: "Quản lý" },
      { label: "Loyalty" },
      { label: "Khách hàng thành viên", active: true },
    ],
    title: "KHÁCH HÀNG THÀNH VIÊN",
  },
  "nha-cung-cap": {
    breadcrumb: [
      { label: "Quản lý" },
      { label: "Kho hàng" },
      { label: "Nhà cung cấp" },
      { label: "Cập nhật nhà cung cấp", active: true },
    ],
    title: "CẬP NHẬT NHÀ CUNG CẤP",
  },
  "bao-cao": {
    breadcrumb: [
      { label: "Quản lý" },
      { label: "Báo cáo" },
      { label: "Tổng quan", active: true },
    ],
    title: "BÁO CÁO TỔNG QUAN",
  },
  "gan-mat-hang": {
    breadcrumb: [
      { label: "Bán Hàng" },
      { label: "Mặt Hàng" },
      { label: "Gắn mặt hàng cho cửa hàng", active: true },
    ],
    title: "GÁN MẶT HÀNG CHO CỬA HÀNG",
  },
  "cau-hinh-he-thong": {
    breadcrumb: [
      { label: "Quản lý" },
      { label: "Cấu hình hệ thống", active: true },
    ],
    title: "CẤU HÌNH HỆ THỐNG",
  },
};

export const SYSTEM_MENU_BREADCRUMB = [
  { label: "Quản lý" },
  { label: "Cấu hình hệ thống" },
  { label: "Cấu hình menu", active: true },
];
