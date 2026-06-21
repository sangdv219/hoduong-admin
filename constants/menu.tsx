"use client";

import {
  BellOutlined,
  DashboardOutlined,
  FireOutlined,
  SettingOutlined,
  ShoppingOutlined,
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
        label: "Mặt Hàng",
        children: [
          {
            key: "pha-do",
            label: "Phả đồ",
            icon: <FireOutlined />,
          },
          {
            key: "nguoi-dung",
            label: "Người dùng",
            icon: <UserOutlined />,
          },
          {
            key: "vai-tro",
            label: "Vai trò",
            icon: <UserOutlined />,
          },
        ],
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
