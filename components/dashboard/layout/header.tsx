"use client";

import { Layout, Breadcrumb, Dropdown, Avatar, Tooltip } from "antd";
import { BellOutlined, DownOutlined } from "@ant-design/icons";
import { HEADER_BG, GREEN_ACCENT } from "@/constants/colors";
import { userDropdownItems } from "@/constants/menu";
import type { ViewMeta } from "@/types/dashboard";

const { Header } = Layout;

interface DashboardHeaderProps {
  meta: ViewMeta;
}

export function DashboardHeader({ meta }: DashboardHeaderProps) {
  return (
    <Header
      style={{
        background: HEADER_BG,
        padding: "0 20px",
        height: 52,
        lineHeight: "52px",
        borderBottom: "1px solid #e8e8e8",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
      }}
    >
      <Breadcrumb
        separator={<span style={{ color: "#d0d0d0", fontSize: 12 }}>›</span>}
        style={{ fontSize: 13 }}
        items={meta.breadcrumb.map((item) => ({
          title: item.active ? (
            <span style={{ color: "#1a1a1a", fontWeight: 600 }}>{item.label}</span>
          ) : (
            <span style={{ color: "#9b9b9b", cursor: "pointer" }}>{item.label}</span>
          ),
        }))}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "3px 10px",
            background: "#f0fdf6",
            borderRadius: 20,
            border: "1px solid #bbf7d0",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: GREEN_ACCENT,
              display: "inline-block",
              boxShadow: "0 0 0 2px #bbf7d060",
              animation: "pulse 2s infinite",
            }}
          />
          <span style={{ fontSize: 12, color: "#15803d", fontWeight: 500 }}>Tín hiệu tốt</span>
        </div>

        <Tooltip title="Thông báo">
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
              padding: 4,
              color: "#595959",
              display: "flex",
              alignItems: "center",
            }}
          >
            <BellOutlined style={{ fontSize: 16 }} />
            <span
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 7,
                height: 7,
                background: "#f5222d",
                borderRadius: "50%",
                border: "1px solid white",
              }}
            />
          </button>
        </Tooltip>

        <div style={{ width: 1, height: 22, background: "#e8e8e8" }} />

        <Dropdown menu={{ items: userDropdownItems }} trigger={["click"]} placement="bottomRight">
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: "4px 8px",
              borderRadius: 6,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            <Avatar
              size={30}
              style={{
                background: "linear-gradient(135deg, #2a8a55 0%, #0d5c35 100%)",
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
                letterSpacing: "0.03em",
              }}
            >
              NB
            </Avatar>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#1a1a1a",
                maxWidth: 130,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Nhà Hàng Bado
            </span>
            <DownOutlined style={{ fontSize: 9, color: "#8c8c8c" }} />
          </button>
        </Dropdown>
      </div>
    </Header>
  );
}
