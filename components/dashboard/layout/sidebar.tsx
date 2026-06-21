"use client";

import { Layout, Menu, Input, Tooltip } from "antd";
import {
  SearchOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import {
  SIDEBAR_BG,
  SIDEBAR_BORDER,
  SIDEBAR_TEXT,
  SIDEBAR_TEXT_DIM,
  SIDEBAR_GROUP_CLR,
  GREEN_ACCENT,
} from "@/constants/colors";
import { siderMenuItems } from "@/constants/menu";
import type { ViewKey } from "@/types/dashboard";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  openKeys: string[];
  onOpenKeysChange: (keys: string[]) => void;
  currentView: ViewKey;
  onMenuSelect: (info: { key: string }) => void;
}

export function Sidebar({
  collapsed,
  onCollapsedChange,
  openKeys,
  onOpenKeysChange,
  currentView,
  onMenuSelect,
}: SidebarProps) {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      width={240}
      collapsedWidth={64}
      trigger={null}
      style={{
        background: SIDEBAR_BG,
        position: "fixed",
        inset: "0 auto 0 0",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "2px 0 12px rgba(0,0,0,0.35)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div
          style={{
            padding: collapsed ? "16px 0" : "16px 14px",
            borderBottom: `1px solid ${SIDEBAR_BORDER}`,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              justifyContent: collapsed ? "center" : "flex-start",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                background: "linear-gradient(145deg, #2a8a55 0%, #0d5c35 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 3px 10px rgba(0,0,0,0.4)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M3 5h14M3 10h14M3 15h9" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <circle cx="17" cy="15" r="2.5" fill="#7fffc4" />
              </svg>
            </div>

            {!collapsed && (
              <div style={{ minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: 12.5,
                    lineHeight: "16px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Cửa hàng mặc định
                </div>
                <div
                  style={{
                    color: SIDEBAR_GROUP_CLR,
                    fontSize: 10.5,
                    lineHeight: "15px",
                    marginTop: 1,
                  }}
                >
                  Quản trị viên
                </div>
              </div>
            )}

            {!collapsed && (
              <Tooltip title="Thu gọn" placement="right">
                <button
                  onClick={() => onCollapsedChange(true)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: SIDEBAR_TEXT_DIM,
                    padding: 2,
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    flexShrink: 0,
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = SIDEBAR_TEXT)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = SIDEBAR_TEXT_DIM)}
                >
                  <MenuFoldOutlined style={{ fontSize: 13 }} />
                </button>
              </Tooltip>
            )}
          </div>

          {!collapsed && (
            <Input
              prefix={<SearchOutlined style={{ color: SIDEBAR_TEXT_DIM, fontSize: 12 }} />}
              placeholder="Tìm kiếm..."
              size="small"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 6,
                fontSize: 12,
                height: 30,
              }}
              styles={{
                input: {
                  background: "transparent",
                  color: SIDEBAR_TEXT,
                  fontSize: 12,
                },
              }}
            />
          )}

          {collapsed && (
            <Tooltip title="Mở rộng" placement="right">
              <button
                onClick={() => onCollapsedChange(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: SIDEBAR_TEXT_DIM,
                  padding: 0,
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = SIDEBAR_TEXT)}
                onMouseLeave={(e) => (e.currentTarget.style.color = SIDEBAR_TEXT_DIM)}
              >
                <MenuUnfoldOutlined style={{ fontSize: 14 }} />
              </button>
            </Tooltip>
          )}
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            paddingTop: 6,
            paddingBottom: 6,
          }}
        >
          <Menu
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            openKeys={openKeys}
            selectedKeys={[currentView]}
            onOpenChange={(keys) => onOpenKeysChange(keys as string[])}
            onSelect={onMenuSelect}
            items={siderMenuItems}
            style={{
              background: SIDEBAR_BG,
              border: "none",
              fontSize: 13,
            }}
          />
        </div>

        <div
          style={{
            padding: collapsed ? "10px 0" : "10px 16px",
            borderTop: `1px solid ${SIDEBAR_BORDER}`,
            display: "flex",
            alignItems: "center",
            gap: 7,
            justifyContent: collapsed ? "center" : "flex-start",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: GREEN_ACCENT,
              boxShadow: `0 0 5px ${GREEN_ACCENT}80`,
              flexShrink: 0,
            }}
          />
          {!collapsed && (
            <span style={{ color: SIDEBAR_TEXT_DIM, fontSize: 11 }}>Version v1.10.1</span>
          )}
        </div>
      </div>
    </Sider>
  );
}
