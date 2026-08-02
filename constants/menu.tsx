"use client";

import {
  AccountBookOutlined,
  AuditOutlined,
  BankOutlined,
  BarChartOutlined,
  BellOutlined,
  BranchesOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  DashboardOutlined,
  ExperimentOutlined,
  FileProtectOutlined,
  InboxOutlined,
  QrcodeOutlined,
  SettingOutlined,
  ShoppingOutlined,
  SlidersOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const siderMenuItems: MenuItem[] = [
  {
    type: "group",
    label: "QUẢN TRỊ WEBSITE",
    children: [
      {
        key: "tong-quan",
        icon: <DashboardOutlined />,
        label: "Tổng Quan",
      },
      {
        key: "mat-hang",
        icon: <ShoppingOutlined />,
        label: "Gia phả",
        children: [
          {
            key: "family-members",
            label: "Phả đồ",
            icon: <BranchesOutlined />,
          },
          {
            key: "user",
            label: "Người dùng",
            icon: <TeamOutlined />,
          },
        ],
      },
      {
        key: "hoa-don-dien-tu",
        icon: <FileProtectOutlined />,
        label: "Hoá Đơn Điện Tử",
      },
      {
        key: "dat-ban",
        icon: <CalendarOutlined />,
        label: "Đặt Bàn",
        children: [
          {
            key: "cau-hinh-dat-ban",
            label: "Cấu Hình Đặt Bàn",
            icon: <SettingOutlined />,
          },
          {
            key: "qr-theo-ban",
            label: "QR Theo Bàn",
            icon: <QrcodeOutlined />,
          },
        ],
      },
    ],
  },
  {
    type: "group",
    label: "QUẢN LÝ",
    children: [
      { key: "khach-hang", icon: <UserOutlined />, label: "Khách Hàng" },
      {
        key: "ban-thanh-pham",
        icon: <ExperimentOutlined />,
        label: "Bán Thành Phẩm",
      },
      {
        key: "kho-hang",
        icon: <InboxOutlined />,
        label: "Kho Hàng",
        children: [
          {
            key: "nha-cung-cap",
            label: "Nhà Cung Cấp",
            icon: <BankOutlined />,
          },
        ],
      },
      { key: "tai-chinh", icon: <AccountBookOutlined />, label: "Tài Chính" },
      {
        key: "loyalty",
        icon: <TrophyOutlined />,
        label: "Loyalty",
        children: [
          {
            key: "khach-hang-thanh-vien",
            label: "Khách Hàng Thành Viên",
            icon: <TeamOutlined />,
          },
        ],
      },
      { key: "bao-cao", icon: <BarChartOutlined />, label: "Báo Cáo" },
      { key: "ke-khai-thue", icon: <AuditOutlined />, label: "Kê Khai Thuế" },
      { key: "quan-tri", icon: <SettingOutlined />, label: "Quản Trị" },
      { key: "tinh-luong", icon: <CalculatorOutlined />, label: "Tính Lương" },
      {
        key: "cau-hinh-he-thong",
        icon: <SlidersOutlined />,
        label: "Cấu Hình Hệ Thống",
      },
    ],
  },
];

export const userDropdownItems: MenuProps["items"] = [
  {
    key: "account",
    label: (
      <div style={{ padding: "4px 0" }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: "#1a1a1a" }}>
          Nhà Hàng Bado
        </div>
        <div style={{ fontSize: 11, color: "#8c8c8c" }}>admin@bado.vn</div>
      </div>
    ),
  },
  { type: "divider" },
  { key: "profile", label: "Hồ sơ cá nhân", icon: <UserOutlined /> },
  { key: "settings", label: "Cài đặt hệ thống", icon: <SettingOutlined /> },
  { key: "notifs", label: "Thông báo", icon: <BellOutlined /> },
  { type: "divider" },
  { key: "logout", label: <span style={{ color: "#cf1322" }}>Đăng xuất</span> },
];
