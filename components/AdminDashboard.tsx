"use client";

import React, { useState } from "react";
import {
  Layout,
  Menu,
  Input,
  Button,
  Tag,
  Breadcrumb,
  Dropdown,
  Avatar,
  ConfigProvider,
  Badge,
  Switch,
  Divider,
  Tooltip,
  Tabs,
  Table,
  Select,
  Space,
  Row,
  Col,
  Form,
  Empty,
} from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import {
  DashboardOutlined,
  ShoppingOutlined,
  ThunderboltOutlined,
  FileProtectOutlined,
  CalendarOutlined,
  UserOutlined,
  ExperimentOutlined,
  InboxOutlined,
  AccountBookOutlined,
  TrophyOutlined,
  BarChartOutlined,
  AuditOutlined,
  SettingOutlined,
  CalculatorOutlined,
  DownOutlined,
  QrcodeOutlined,
  SearchOutlined,
  LinkOutlined,
  TagsOutlined,
  AppstoreOutlined,
  FireOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GlobalOutlined,
  BellOutlined,
  SaveOutlined,
  EditOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  ReloadOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  ShopOutlined,
  CloseOutlined,
  BankOutlined,
  PlusOutlined,
  PieChartOutlined,
  DeleteOutlined,
  HomeOutlined,
  ArrowLeftOutlined,
  PrinterOutlined,
  NotificationOutlined,
  ScissorOutlined,
  DollarOutlined,
  BuildOutlined,
  ApartmentOutlined,
  InfoCircleOutlined,
  BranchesOutlined,
  SlidersOutlined,
  RightOutlined,
} from "@ant-design/icons";

const { Sider, Header, Content } = Layout;

// ─── Design Tokens ────────────────────────────────────────────────────────────
const SIDEBAR_BG        = "#0a1f14";
const SIDEBAR_ITEM_BG   = "#0d2318";
const SIDEBAR_HOVER     = "#162e1e";
const SIDEBAR_ACTIVE    = "#1a3d28";
const SIDEBAR_BORDER    = "rgba(255,255,255,0.05)";
const SIDEBAR_TEXT      = "#b8d4c4";
const SIDEBAR_TEXT_DIM  = "#4e7a60";
const SIDEBAR_GROUP_CLR = "#3d6b50";
const GREEN_PRIMARY     = "#1a7a48";
const GREEN_DARK        = "#0d5c35";
const GREEN_LIGHT       = "#e6f7ed";
const GREEN_ACCENT      = "#22c55e";
const HEADER_BG         = "#ffffff";
const CONTENT_BG        = "#f0f2f5";
const SURFACE_BG        = "#ffffff";

// ─── View config map ──────────────────────────────────────────────────────────
type ViewKey = "cau-hinh-dat-ban" | "khach-hang-thanh-vien" | "nha-cung-cap" | "bao-cao" | "gan-mat-hang" | "cau-hinh-he-thong";
type SystemSubView = null | "cau-hinh-menu";

const VIEW_META: Record<ViewKey, {
  breadcrumb: { label: string; active?: boolean }[];
  title: string;
}> = {
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

type MenuItem = Required<MenuProps>["items"][number];

// ─── Menu Data ────────────────────────────────────────────────────────────────
const siderMenuItems: MenuItem[] = [
  {
    type: "group",
    label: "BÁN HÀNG",
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
          { key: "mat-hang-item",  label: "Mặt Hàng",      icon: <ShoppingOutlined /> },
          { key: "thuc-don",       label: "Thực Đơn",       icon: <UnorderedListOutlined /> },
          { key: "bep",            label: "Bếp",            icon: <FireOutlined /> },
          { key: "danh-muc",       label: "Danh Mục",       icon: <AppstoreOutlined /> },
          { key: "don-vi-tinh",    label: "Đơn Vị Tính",    icon: <TagsOutlined /> },
          { key: "nhom-lua-chon",  label: "Nhóm Lựa Chọn",  icon: <MenuFoldOutlined /> },
          { key: "chinh-sach-gia", label: "Chính Sách Giá", icon: <TagsOutlined /> },
          { key: "gan-mat-hang",   label: "Gắn Mặt Hàng",   icon: <LinkOutlined /> },
        ],
      },
      {
        key: "chuong-trinh-ban-hang",
        icon: <ThunderboltOutlined />,
        label: "Chương Trình Bán Hàng",
      },
      {
        key: "danh-sach-hoa-don",
        icon: <FileTextOutlined />,
        label: "Danh Sách Hoá Đơn",
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
      { key: "khach-hang",     icon: <UserOutlined />,        label: "Khách Hàng" },
      { key: "ban-thanh-pham", icon: <ExperimentOutlined />,  label: "Bán Thành Phẩm" },
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
      { key: "tai-chinh",      icon: <AccountBookOutlined />, label: "Tài Chính" },
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
      { key: "bao-cao",      icon: <BarChartOutlined />,    label: "Báo Cáo" },
      { key: "ke-khai-thue", icon: <AuditOutlined />,       label: "Kê Khai Thuế" },
      { key: "quan-tri",     icon: <SettingOutlined />,     label: "Quản Trị" },
      { key: "tinh-luong",   icon: <CalculatorOutlined />,  label: "Tính Lương" },
      {
        key:   "cau-hinh-he-thong",
        icon:  <SlidersOutlined />,
        label: "Cấu Hình Hệ Thống",
      },
    ],
  },
];

const userDropdownItems: MenuProps["items"] = [
  {
    key: "account",
    label: (
      <div style={{ padding: "4px 0" }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: "#1a1a1a" }}>Nhà Hàng Bado</div>
        <div style={{ fontSize: 11, color: "#8c8c8c" }}>admin@bado.vn</div>
      </div>
    ),
  },
  { type: "divider" },
  { key: "profile",  label: "Hồ sơ cá nhân",    icon: <UserOutlined /> },
  { key: "settings", label: "Cài đặt hệ thống", icon: <SettingOutlined /> },
  { key: "notifs",   label: "Thông báo",         icon: <BellOutlined /> },
  { type: "divider" },
  { key: "logout",   label: <span style={{ color: "#cf1322" }}>Đăng xuất</span> },
];

// ─── Main Component ─────���─────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [collapsed,       setCollapsed]       = useState(false);
  const [openKeys,        setOpenKeys]        = useState<string[]>(["dat-ban"]);
  const [currentView,     setCurrentView]     = useState<ViewKey>("cau-hinh-dat-ban");
  const [activeTab,       setActiveTab]       = useState("dat-ban-config");
  const [systemSubView,   setSystemSubView]   = useState<SystemSubView>(null);

  const siderWidth = collapsed ? 64 : 240;
  const baseMeta   = VIEW_META[currentView];
  const meta = (currentView === "cau-hinh-he-thong" && systemSubView === "cau-hinh-menu")
    ? {
        ...baseMeta,
        breadcrumb: [
          { label: "Quản lý" },
          { label: "Cấu hình hệ thống" },
          { label: "Cấu hình menu", active: true },
        ],
      }
    : baseMeta;

  function handleMenuSelect({ key }: { key: string }) {
    if (
      key === "cau-hinh-dat-ban" ||
      key === "khach-hang-thanh-vien" ||
      key === "nha-cung-cap" ||
      key === "bao-cao" ||
      key === "gan-mat-hang" ||
      key === "cau-hinh-he-thong"
    ) {
      setCurrentView(key as ViewKey);
      if (key === "cau-hinh-he-thong") setSystemSubView(null);
    }
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: GREEN_PRIMARY,
          colorSuccess: GREEN_ACCENT,
          borderRadius: 6,
          fontFamily:   "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          fontSize:     13,
        },
        components: {
          Layout: {
            siderBg:  SIDEBAR_BG,
            headerBg: HEADER_BG,
            bodyBg:   CONTENT_BG,
          },
          Menu: {
            darkItemBg:            SIDEBAR_BG,
            darkSubMenuItemBg:     SIDEBAR_ITEM_BG,
            darkItemSelectedBg:    SIDEBAR_ACTIVE,
            darkItemHoverBg:       SIDEBAR_HOVER,
            darkItemColor:         SIDEBAR_TEXT,
            darkItemSelectedColor: "#ffffff",
            darkItemHoverColor:    "#ffffff",
            darkGroupTitleColor:   SIDEBAR_GROUP_CLR,
            iconSize:              14,
            itemHeight:            36,
            groupTitleFontSize:    10,
            collapsedIconSize:     16,
            subMenuItemBorderRadius: 4,
            itemBorderRadius:      4,
            itemMarginInline:      6,
          },
          Breadcrumb: {
            itemColor:      "#8c8c8c",
            lastItemColor:  "#1a1a1a",
            separatorColor: "#bfbfbf",
            fontSize:       13,
          },
          Button: {
            borderRadius: 6,
          },
          Tabs: {
            inkBarColor:      GREEN_PRIMARY,
            itemActiveColor:  GREEN_PRIMARY,
            itemSelectedColor: GREEN_PRIMARY,
            itemHoverColor:   GREEN_DARK,
          },
          Switch: {
            colorPrimary: GREEN_PRIMARY,
          },
          Table: {
            headerBg:           "#dde6e4",
            headerColor:        "#374151",
            headerSortActiveBg: "#cdd8d6",
            rowHoverBg:         "#f9fffe",
            borderColor:        "#e8eeec",
            fontSize:           13,
          },
        },
      }}
    >
      <Layout style={{ minHeight: "100vh", fontFamily: "inherit" }}>
        {/* ═══════════════════════════════════════════════════════ SIDEBAR */}
        <Sider
          collapsible
          collapsed={collapsed}
          width={240}
          collapsedWidth={64}
          trigger={null}
          style={{
            background:    SIDEBAR_BG,
            position:      "fixed",
            inset:         "0 auto 0 0",
            zIndex:        200,
            display:       "flex",
            flexDirection: "column",
            overflow:      "hidden",
            boxShadow:     "2px 0 12px rgba(0,0,0,0.35)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* ── Brand ── */}
            <div
              style={{
                padding:       collapsed ? "16px 0" : "16px 14px",
                borderBottom:  `1px solid ${SIDEBAR_BORDER}`,
                flexShrink:    0,
                display:       "flex",
                flexDirection: "column",
                gap:           10,
              }}
            >
              <div
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  gap:            10,
                  justifyContent: collapsed ? "center" : "flex-start",
                }}
              >
                {/* Logo mark */}
                <div
                  style={{
                    width:          34,
                    height:         34,
                    borderRadius:   9,
                    background:     "linear-gradient(145deg, #2a8a55 0%, #0d5c35 100%)",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    flexShrink:     0,
                    boxShadow:      "0 3px 10px rgba(0,0,0,0.4)",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M3 5h14M3 10h14M3 15h9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="17" cy="15" r="2.5" fill="#7fffc4"/>
                  </svg>
                </div>

                {!collapsed && (
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        color:        "#ffffff",
                        fontWeight:   700,
                        fontSize:     12.5,
                        lineHeight:   "16px",
                        whiteSpace:   "nowrap",
                        overflow:     "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Cửa hàng mặc định
                    </div>
                    <div style={{ color: SIDEBAR_GROUP_CLR, fontSize: 10.5, lineHeight: "15px", marginTop: 1 }}>
                      Quản trị viên
                    </div>
                  </div>
                )}

                {!collapsed && (
                  <Tooltip title="Thu gọn" placement="right">
                    <button
                      onClick={() => setCollapsed(true)}
                      style={{
                        background:  "none",
                        border:      "none",
                        cursor:      "pointer",
                        color:       SIDEBAR_TEXT_DIM,
                        padding:     2,
                        borderRadius: 4,
                        display:     "flex",
                        alignItems:  "center",
                        flexShrink:  0,
                        transition:  "color 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = SIDEBAR_TEXT)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = SIDEBAR_TEXT_DIM)}
                    >
                      <MenuFoldOutlined style={{ fontSize: 13 }} />
                    </button>
                  </Tooltip>
                )}
              </div>

              {/* Search bar – hidden when collapsed */}
              {!collapsed && (
                <Input
                  prefix={<SearchOutlined style={{ color: SIDEBAR_TEXT_DIM, fontSize: 12 }} />}
                  placeholder="Tìm kiếm..."
                  size="small"
                  style={{
                    background:   "rgba(255,255,255,0.06)",
                    border:       "1px solid rgba(255,255,255,0.09)",
                    borderRadius: 6,
                    fontSize:     12,
                    height:       30,
                  }}
                  styles={{
                    input: {
                      background: "transparent",
                      color:      SIDEBAR_TEXT,
                      fontSize:   12,
                    },
                  }}
                />
              )}

              {/* Collapsed: show expand icon centered */}
              {collapsed && (
                <Tooltip title="Mở rộng" placement="right">
                  <button
                    onClick={() => setCollapsed(false)}
                    style={{
                      background:     "none",
                      border:         "none",
                      cursor:         "pointer",
                      color:          SIDEBAR_TEXT_DIM,
                      padding:        0,
                      borderRadius:   4,
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      width:          "100%",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = SIDEBAR_TEXT)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = SIDEBAR_TEXT_DIM)}
                  >
                    <MenuUnfoldOutlined style={{ fontSize: 14 }} />
                  </button>
                </Tooltip>
              )}
            </div>

            {/* ── Navigation ── */}
            <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", paddingTop: 6, paddingBottom: 6 }}>
              <Menu
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                openKeys={openKeys}
                selectedKeys={[currentView]}
                onOpenChange={(keys) => setOpenKeys(keys as string[])}
                onSelect={handleMenuSelect}
                items={siderMenuItems}
                style={{
                  background: SIDEBAR_BG,
                  border:     "none",
                  fontSize:   13,
                }}
              />
            </div>

            {/* ── Version ── */}
            <div
              style={{
                padding:        collapsed ? "10px 0" : "10px 16px",
                borderTop:      `1px solid ${SIDEBAR_BORDER}`,
                display:        "flex",
                alignItems:     "center",
                gap:            7,
                justifyContent: collapsed ? "center" : "flex-start",
                flexShrink:     0,
              }}
            >
              <div
                style={{
                  width:        6,
                  height:       6,
                  borderRadius: "50%",
                  background:   GREEN_ACCENT,
                  boxShadow:    `0 0 5px ${GREEN_ACCENT}80`,
                  flexShrink:   0,
                }}
              />
              {!collapsed && (
                <span style={{ color: SIDEBAR_TEXT_DIM, fontSize: 11 }}>
                  Version v1.10.1
                </span>
              )}
            </div>
          </div>
        </Sider>

        {/* ═══════════════════════════════════════ MAIN AREA */}
        <Layout style={{ marginLeft: siderWidth, transition: "margin-left 0.2s", minHeight: "100vh" }}>
          {/* ── HEADER ── */}
          <Header
            style={{
              background:     HEADER_BG,
              padding:        "0 20px",
              height:         52,
              lineHeight:     "52px",
              borderBottom:   "1px solid #e8e8e8",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              position:       "sticky",
              top:            0,
              zIndex:         100,
              boxShadow:      "0 1px 6px rgba(0,0,0,0.06)",
            }}
          >
            {/* Left – dynamic breadcrumb */}
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

            {/* Right – status + notifications + user */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* Signal status */}
              <div
                style={{
                  display:      "flex",
                  alignItems:   "center",
                  gap:          6,
                  padding:      "3px 10px",
                  background:   "#f0fdf6",
                  borderRadius: 20,
                  border:       "1px solid #bbf7d0",
                }}
              >
                <span
                  style={{
                    width:        7,
                    height:       7,
                    borderRadius: "50%",
                    background:   GREEN_ACCENT,
                    display:      "inline-block",
                    boxShadow:    "0 0 0 2px #bbf7d060",
                    animation:    "pulse 2s infinite",
                  }}
                />
                <span style={{ fontSize: 12, color: "#15803d", fontWeight: 500 }}>
                  Tín hiệu tốt
                </span>
              </div>

              {/* Notifications */}
              <Tooltip title="Thông báo">
                <button
                  style={{
                    background: "none",
                    border:     "none",
                    cursor:     "pointer",
                    position:   "relative",
                    padding:    4,
                    color:      "#595959",
                    display:    "flex",
                    alignItems: "center",
                  }}
                >
                  <BellOutlined style={{ fontSize: 16 }} />
                  <span
                    style={{
                      position:     "absolute",
                      top:          0,
                      right:        0,
                      width:        7,
                      height:       7,
                      background:   "#f5222d",
                      borderRadius: "50%",
                      border:       "1px solid white",
                    }}
                  />
                </button>
              </Tooltip>

              {/* Divider */}
              <div style={{ width: 1, height: 22, background: "#e8e8e8" }} />

              {/* User dropdown */}
              <Dropdown
                menu={{ items: userDropdownItems }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <button
                  style={{
                    display:      "flex",
                    alignItems:   "center",
                    gap:          8,
                    cursor:       "pointer",
                    background:   "none",
                    border:       "none",
                    padding:      "4px 8px",
                    borderRadius: 6,
                    transition:   "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                >
                  <Avatar
                    size={30}
                    style={{
                      background:    "linear-gradient(135deg, #2a8a55 0%, #0d5c35 100%)",
                      fontSize:      11,
                      fontWeight:    700,
                      flexShrink:    0,
                      letterSpacing: "0.03em",
                    }}
                  >
                    NB
                  </Avatar>
                  <span
                    style={{
                      fontSize:     13,
                      fontWeight:   600,
                      color:        "#1a1a1a",
                      maxWidth:     130,
                      overflow:     "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace:   "nowrap",
                    }}
                  >
                    Nhà Hàng Bado
                  </span>
                  <DownOutlined style={{ fontSize: 9, color: "#8c8c8c" }} />
                </button>
              </Dropdown>
            </div>
          </Header>

          {/* ═══════════════════════════════════════ CONTENT */}
          <Content style={{ background: CONTENT_BG, minHeight: "calc(100vh - 52px)" }}>
            {currentView === "cau-hinh-dat-ban" && (
              <CauHinhDatBanView activeTab={activeTab} setActiveTab={setActiveTab} />
            )}
            {currentView === "khach-hang-thanh-vien" && (
              <KhachHangThanhVienView />
            )}
            {currentView === "nha-cung-cap" && (
              <NhaCungCapView />
            )}
            {currentView === "bao-cao" && (
              <BaoCaoView onNavigateHome={() => setCurrentView("cau-hinh-dat-ban")} />
            )}
            {currentView === "gan-mat-hang" && (
              <GanMatHangView />
            )}
            {currentView === "cau-hinh-he-thong" && (
              <CauHinhHeThongView
                systemSubView={systemSubView}
                setSystemSubView={setSystemSubView}
              />
            )}
          </Content>
        </Layout>
      </Layout>

      {/* Global animations & AntD dark-menu overrides */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
        .ant-menu-dark.ant-menu-inline .ant-menu-item-group-title {
          font-size: 10px !important;
          font-weight: 700 !important;
          letter-spacing: 0.08em !important;
          padding: 14px 16px 4px !important;
          color: ${SIDEBAR_GROUP_CLR} !important;
          text-transform: uppercase;
        }
        .ant-menu-dark .ant-menu-sub.ant-menu-inline {
          background: ${SIDEBAR_ITEM_BG} !important;
        }
        .ant-layout-sider .ant-menu-dark {
          padding: 0 4px;
        }
      `}</style>
    </ConfigProvider>
  );
}

// ─── VIEW: Cấu Hình Đ��t Bàn ──────────────────────────────────────────────────
function CauHinhDatBanView({
  activeTab,
  setActiveTab,
}: {
  activeTab:    string;
  setActiveTab: (k: string) => void;
}) {
  return (
    <>
      {/* Page title bar */}
      <div
        style={{
          background:     SURFACE_BG,
          borderBottom:   "1px solid #e8e8e8",
          padding:        "0 24px",
          height:         54,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h1
            style={{
              margin:        0,
              fontSize:      14,
              fontWeight:    800,
              color:         "#111",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Cấu Hình Website
          </h1>

          <Tag
            style={{
              background:    "#fff1f0",
              color:         "#cf1322",
              border:        "1px solid #ffccc7",
              borderRadius:  4,
              fontWeight:    600,
              fontSize:      11,
              padding:       "1px 8px",
              letterSpacing: "0.02em",
              margin:        0,
              cursor:        "default",
            }}
          >
            Ngừng hoạt động
          </Tag>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Button
            icon={<SaveOutlined />}
            style={{
              fontSize:     13,
              height:       34,
              paddingLeft:  14,
              paddingRight: 14,
              color:        "#595959",
              borderColor:  "#d9d9d9",
              fontWeight:   500,
            }}
          >
            Lưu nháp
          </Button>

          <Button
            type="primary"
            icon={<GlobalOutlined />}
            style={{
              background:  GREEN_PRIMARY,
              borderColor: GREEN_PRIMARY,
              fontWeight:  600,
              fontSize:    13,
              height:      34,
              paddingLeft:  16,
              paddingRight: 16,
              boxShadow:   `0 2px 6px ${GREEN_PRIMARY}55`,
            }}
          >
            Xuất bản
          </Button>
        </div>
      </div>

      {/* Page body */}
      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
        {/* Tab strip */}
        <div
          style={{
            background:   SURFACE_BG,
            borderRadius: 8,
            boxShadow:    "0 1px 4px rgba(0,0,0,0.07)",
            overflow:     "hidden",
          }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            style={{ padding: "0 20px" }}
            items={[
              { key: "thong-tin",     label: "Thông tin chung" },
              { key: "giao-dien",     label: "Giao diện" },
              { key: "dat-ban-config", label: "Cài đặt đặt bàn" },
              { key: "thong-bao",     label: "Thông báo" },
            ]}
          />
        </div>

        {/* Two-column grid */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 18,
            alignItems:         "start",
          }}
        >
          {/* ── Left column ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <SettingCard title="Cài đặt đặt bàn" icon={<CalendarOutlined />}>
              <SwitchRow
                label="Cho phép đặt bàn trực tuyến"
                description="Hiển thị form đặt bàn trên website"
                checked
              />
              <Divider style={{ margin: "4px 0" }} />
              <InfoRow label="Số người tối thiểu / bàn" value="1 người" />
              <InfoRow label="Số người tối đa / bàn"    value="20 người" />
              <InfoRow label="Đặt trước tối thiểu"      value="30 phút" />
              <InfoRow label="Thời gian hủy tối thiểu"  value="60 phút" />
              <Divider style={{ margin: "4px 0" }} />
              <SwitchRow
                label="Xác nhận thủ công"
                description="Nhân viên duyệt từng đặt bàn"
                checked
              />
              <SwitchRow
                label="Yêu cầu số điện thoại"
                description="Bắt buộc nhập SĐT khi đặt bàn"
                checked={false}
              />
            </SettingCard>

            <SettingCard title="Thông tin nhà hàng" icon={<EnvironmentOutlined />}>
              <InfoRow label="Tên nhà hàng" value="Nhà Hàng Bado" />
              <InfoRow label="Địa chỉ"      value="123 Nguyễn Huệ, Q.1, TP.HCM" />
              <InfoRow
                label="Điện thoại"
                value="028 3822 6688"
                icon={<PhoneOutlined style={{ color: GREEN_PRIMARY, fontSize: 11 }} />}
              />
              <InfoRow
                label="Email"
                value="contact@bado.vn"
                icon={<MailOutlined style={{ color: GREEN_PRIMARY, fontSize: 11 }} />}
              />
              <InfoRow label="Sức chứa tối đa" value="200 khách" />
            </SettingCard>
          </div>

          {/* ── Right column ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <SettingCard title="Giờ hoạt động" icon={<ClockCircleOutlined />}>
              <HoursRow day="Thứ 2 – Thứ 6" hours="10:00 – 22:00" active />
              <HoursRow day="Thứ 7"          hours="09:00 – 23:00" active />
              <HoursRow day="Chủ Nhật"       hours="09:00 – 22:00" active />
              <HoursRow day="Ngày lễ"        hours="Theo lịch"     active={false} />
            </SettingCard>

            <SettingCard title="Thông báo tự động" icon={<BellOutlined />}>
              <SwitchRow
                label="Xác nhận qua SMS"
                description="Gửi SMS sau khi đặt bàn thành công"
                checked
              />
              <SwitchRow
                label="Nhắc nhở trước 2 giờ"
                description="Nhắc khách trước giờ đặt bàn"
                checked
              />
              <SwitchRow
                label="Thông báo hủy đặt bàn"
                description="Gửi SMS khi kh��ch hủy"
                checked
              />
              <Divider style={{ margin: "4px 0" }} />
              <InfoRow label="Ngôn ngữ thông báo" value="Tiếng Việt" />
              <InfoRow label="Số điện thoại gửi"  value="+84 028 xxxx" />
            </SettingCard>

            <SettingCard title="Chính sách đặt cọc" icon={<AccountBookOutlined />}>
              <SwitchRow
                label="Yêu cầu đặt cọc"
                description="Khách phải cọc trước khi đặt bàn"
                checked={false}
              />
              <Divider style={{ margin: "4px 0" }} />
              <InfoRow label="Số tiền đặt cọc"     value="—"              valueColor="#bfbfbf" />
              <InfoRow label="Chính sách hoàn cọc" value="Chưa cấu hình" valueColor="#bfbfbf" />
              <InfoRow label="Thời hạn hoàn cọc"   value="—"              valueColor="#bfbfbf" />
            </SettingCard>
          </div>
        </div>

        {/* QR Banner */}
        <div
          style={{
            background:     "linear-gradient(135deg, #0a1f14 0%, #1a3d28 100%)",
            borderRadius:   10,
            padding:        "18px 24px",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            color:          "#fff",
            boxShadow:      "0 4px 16px rgba(10,31,20,0.35)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width:          46,
                height:         46,
                borderRadius:   10,
                background:     "rgba(255,255,255,0.1)",
                border:         "1px solid rgba(255,255,255,0.15)",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                flexShrink:     0,
              }}
            >
              <QrcodeOutlined style={{ fontSize: 24, color: "#7fffc4" }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>
                QR Đặt Bàn Trực Tuyến
              </div>
              <div style={{ fontSize: 12, color: "#8dc9aa" }}>
                Chia sẻ mã QR để khách hàng đặt bàn ngay trên điện thoại
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <Button
              icon={<QrcodeOutlined />}
              size="middle"
              style={{
                background: "rgba(255,255,255,0.1)",
                border:     "1px solid rgba(255,255,255,0.2)",
                color:      "#fff",
                fontWeight: 500,
                fontSize:   12,
                height:     34,
              }}
            >
              Xem QR
            </Button>
            <Button
              type="primary"
              size="middle"
              style={{
                background:  GREEN_PRIMARY,
                borderColor: GREEN_PRIMARY,
                fontWeight:  600,
                fontSize:    12,
                height:      34,
                boxShadow:   `0 2px 8px ${GREEN_PRIMARY}80`,
              }}
            >
              Tải xuống
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── VIEW: Khách Hàng Thành Viên ─────────────────────────────────────────────
interface CustomerRow {
  key:     string;
  name:    string;
  phone:   string;
  points:  string;
  orders:  string;
  spent:   string;
  status:  "active" | "inactive";
}

const CUSTOMER_DATA: CustomerRow[] = [
  { key: "1",  name: "phongtran",      phone: "",             points: "0.00",  orders: "0.00", spent: "0 đ",         status: "active" },
  { key: "2",  name: "phongtran2",     phone: "",             points: "0.00",  orders: "0.00", spent: "0 đ",         status: "active" },
  { key: "3",  name: "wqfwqf",         phone: "",             points: "0.00",  orders: "0.00", spent: "0 đ",         status: "active" },
  { key: "4",  name: "1231231",        phone: "0918140001",   points: "0.00",  orders: "0.00", spent: "0 đ",         status: "active" },
  { key: "5",  name: "Thêm mới",       phone: "",             points: "0.00",  orders: "0.00", spent: "0 đ",         status: "active" },
  { key: "6",  name: "Khách hàng A",   phone: "0918140000",   points: "97.00", orders: "3.00", spent: "1,018,800 đ", status: "active" },
  { key: "7",  name: "Anh A",          phone: "0987322521",   points: "49.00", orders: "3.00", spent: "250,000 đ",   status: "active" },
  { key: "8",  name: "Anh B",          phone: "0876343236",   points: "0.00",  orders: "0.00", spent: "0 đ",         status: "active" },
  { key: "9",  name: "Phông Bạt",      phone: "0987345234",   points: "10.00", orders: "1.00", spent: "100,000 đ",   status: "active" },
  { key: "10", name: "Công nợ test8",  phone: "098345623523", points: "9.00",  orders: "1.00", spent: "99,000 đ",    status: "inactive" },
  { key: "11", name: "Anh A",          phone: "",             points: "0.00",  orders: "0.00", spent: "0 đ",         status: "active" },
  { key: "12", name: "Khách hàng",     phone: "",             points: "50.00", orders: "0.00", spent: "0 đ",         status: "active" },
  { key: "13", name: "Ông A",          phone: "",             points: "0.00",  orders: "0.00", spent: "0 đ",         status: "active" },
];

const CUSTOMER_COLUMNS: TableColumnsType<CustomerRow> = [
  {
    title:  "",
    key:    "actions",
    width:  72,
    render: () => (
      <Space size={4}>
        <Tooltip title="Kích hoạt">
          <button
            style={{
              background:   "none",
              border:       "none",
              cursor:       "pointer",
              padding:      0,
              color:        "#22c55e",
              display:      "flex",
              alignItems:   "center",
              lineHeight:   1,
            }}
          >
            <PlayCircleOutlined style={{ fontSize: 20 }} />
          </button>
        </Tooltip>
        <Tooltip title="Tạm dừng">
          <button
            style={{
              background: "none",
              border:     "none",
              cursor:     "pointer",
              padding:    0,
              color:      "#f59e0b",
              display:    "flex",
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
    title:     "Tên khách hàng",
    dataIndex: "name",
    key:       "name",
    render:    (text: string) => (
      <span style={{ fontWeight: 500, color: "#1a1a1a" }}>{text}</span>
    ),
  },
  {
    title:     "Số điện thoại",
    dataIndex: "phone",
    key:       "phone",
    render:    (text: string) => (
      <span style={{ color: text ? "#374151" : "#bfbfbf", fontVariantNumeric: "tabular-nums" }}>
        {text || "—"}
      </span>
    ),
  },
  {
    title:     "Điểm tích lũy",
    dataIndex: "points",
    key:       "points",
    align:     "right",
    render:    (v: string) => (
      <span style={{ fontVariantNumeric: "tabular-nums", color: "#374151" }}>{v}</span>
    ),
  },
  {
    title:     "Tổng đơn hàng",
    dataIndex: "orders",
    key:       "orders",
    align:     "right",
    render:    (v: string) => (
      <span style={{ fontVariantNumeric: "tabular-nums", color: "#374151" }}>{v}</span>
    ),
  },
  {
    title:     "Chi tiêu",
    dataIndex: "spent",
    key:       "spent",
    align:     "right",
    render:    (v: string) => (
      <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 500, color: "#111" }}>{v}</span>
    ),
  },
  {
    title:     "Trạng thái",
    dataIndex: "status",
    key:       "status",
    align:     "center",
    render:    (status: CustomerRow["status"]) =>
      status === "active" ? (
        <span style={{ color: "#16a34a", fontWeight: 600, fontSize: 12 }}>Đang hoạt động</span>
      ) : (
        <span style={{ color: "#dc2626", fontWeight: 600, fontSize: 12 }}>Ngừng hoạt động</span>
      ),
  },
];

function KhachHangThanhVienView() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  return (
    <>
      {/* Page title bar */}
      <div
        style={{
          background:     SURFACE_BG,
          borderBottom:   "1px solid #e8e8e8",
          padding:        "0 24px",
          height:         54,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
        }}
      >
        <h1
          style={{
            margin:        0,
            fontSize:      14,
            fontWeight:    800,
            color:         "#111",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Khách Hàng Thành Viên
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            style={{
              background:  GREEN_PRIMARY,
              borderColor: GREEN_PRIMARY,
              fontWeight:  600,
              fontSize:    13,
              height:      34,
              paddingLeft:  16,
              paddingRight: 16,
              boxShadow:   `0 2px 6px ${GREEN_PRIMARY}55`,
            }}
          >
            Thêm khách hàng
          </Button>
        </div>
      </div>

      {/* Page body */}
      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Filter toolbar */}
        <div
          style={{
            background:   SURFACE_BG,
            borderRadius: 8,
            padding:      "14px 18px",
            boxShadow:    "0 1px 4px rgba(0,0,0,0.07)",
            display:      "flex",
            alignItems:   "center",
            gap:          10,
            flexWrap:     "wrap",
          }}
        >
          <Input
            prefix={<SearchOutlined style={{ color: "#9ca3af" }} />}
            placeholder="Tìm kiếm..."
            style={{ width: 300, height: 34, borderRadius: 6, fontSize: 13 }}
            allowClear
          />

          <Select
            placeholder={
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <ShopOutlined style={{ fontSize: 12 }} />
                Chọn cửa hàng
              </span>
            }
            style={{ width: 180, height: 34 }}
            options={[
              { value: "all",     label: "Tất cả cửa hàng" },
              { value: "store-1", label: "Cửa hàng 1" },
            ]}
            allowClear
          />

          <Select
            placeholder={
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <ClockCircleOutlined style={{ fontSize: 12 }} />
                Thời gian
              </span>
            }
            style={{ width: 160, height: 34 }}
            options={[
              { value: "today",  label: "Hôm nay" },
              { value: "week",   label: "Tuần này" },
              { value: "month",  label: "Tháng này" },
              { value: "custom", label: "Tùy chỉnh" },
            ]}
            allowClear
          />

          <Select
            placeholder="Chọn trạng thái"
            style={{ width: 170, height: 34 }}
            options={[
              { value: "active",   label: "Đang hoạt động" },
              { value: "inactive", label: "Ngừng hoạt động" },
            ]}
            allowClear
          />

          <Tooltip title="Làm mới">
            <Button
              icon={<ReloadOutlined />}
              shape="circle"
              style={{
                width:       34,
                height:      34,
                display:     "flex",
                alignItems:  "center",
                justifyContent: "center",
                color:       "#6b7280",
                borderColor: "#d1d5db",
                flexShrink:  0,
              }}
            />
          </Tooltip>
        </div>

        {/* Customer table */}
        <div
          style={{
            background:   SURFACE_BG,
            borderRadius: 8,
            boxShadow:    "0 1px 4px rgba(0,0,0,0.07)",
            overflow:     "hidden",
          }}
        >
          <Table<CustomerRow>
            rowSelection={{
              selectedRowKeys,
              onChange: (keys) => setSelectedRowKeys(keys),
            }}
            columns={CUSTOMER_COLUMNS}
            dataSource={CUSTOMER_DATA}
            pagination={{
              pageSize:        13,
              showSizeChanger: false,
              showTotal:       (total) => (
                <span style={{ fontSize: 12, color: "#6b7280" }}>
                  Tổng {total} khách hàng
                </span>
              ),
              style: { padding: "10px 16px", margin: 0 },
            }}
            size="small"
            rowKey="key"
            style={{ fontSize: 13 }}
            rowClassName={(_, index) =>
              index % 2 === 0 ? "row-even" : "row-odd"
            }
          />
        </div>
      </div>

      {/* Striped rows */}
      <style>{`
        .row-odd td { background: #f8fffe !important; }
        .row-even td { background: #ffffff !important; }
        .ant-table-thead > tr > th {
          font-weight: 700 !important;
          font-size: 12px !important;
          letter-spacing: 0.02em !important;
        }
      `}</style>
    </>
  );
}

// ─── VIEW: Cấu Hình Hệ Thống ─────────────────────────────────────────────────
interface SysCard {
  icon:    React.ReactNode;
  title:   string;
  desc:    string;
  onClick?: () => void;
}

interface SysSection {
  heading: string;
  cols:    number;
  cards:   SysCard[];
}

function CauHinhHeThongView({
  systemSubView,
  setSystemSubView,
}: {
  systemSubView:    SystemSubView;
  setSystemSubView: (v: SystemSubView) => void;
}) {
  if (systemSubView === "cau-hinh-menu") {
    return <CauHinhMenuView onBack={() => setSystemSubView(null)} />;
  }

  const ICON_STYLE: React.CSSProperties = {
    width:          38,
    height:         38,
    borderRadius:   8,
    background:     "#f0f2f5",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    flexShrink:     0,
  };

  const sections: SysSection[] = [
    {
      heading: "Thiết lập chức năng",
      cols:    3,
      cards: [
        {
          icon:  <SettingOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Thiết lập bán hàng",
          desc:  "Xem và thiết lập thông tin bán hàng, ca làm việc.",
        },
        {
          icon:  <CalendarOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Thiết lập bàn",
          desc:  "Xem và thiết lập quản lí bàn trong nhà hàng.",
        },
        {
          icon:  <PrinterOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Thiết lập mẫu in",
          desc:  "Xem và thiết lập mẫu in của nhà hàng.",
        },
        {
          icon:  <DollarOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Điều chỉnh giá vốn mặt hàng",
          desc:  "Xem và điều chỉnh giá vốn của mặt hàng cho cửa hàng.",
        },
        {
          icon:  <NotificationOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Thiết lập thông báo",
          desc:  "Xem và thiết lập người nhận thông báo.",
        },
        {
          icon:  <FireOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Thiết lập in phiếu bếp",
          desc:  "Xem và thiết lập in phiếu bếp.",
        },
        {
          icon:  <MenuUnfoldOutlined style={{ fontSize: 18, color: GREEN_PRIMARY }} />,
          title: "Cấu hình Menu",
          desc:  "Ẩn, hiện các tính năng trong Menu.",
          onClick: () => setSystemSubView("cau-hinh-menu"),
        },
        {
          icon:  <ScissorOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Cân điện tử",
          desc:  "Cấu hình mã cân điện tử.",
        },
      ],
    },
    {
      heading: "Thiết lập đối tác",
      cols:    3,
      cards: [
        {
          icon:  <FileProtectOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Hoá đơn điện tử",
          desc:  "Quản lí kết nối hoá đơn điện tử trong cửa hàng.",
        },
        {
          icon:  <BankOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Ví điện tử",
          desc:  "Xem và thiết lập các tài khoản người nhận, ví điện tử của nhà hàng.",
        },
      ],
    },
    {
      heading: "Thiết lập thông tin",
      cols:    3,
      cards: [
        {
          icon:  <InfoCircleOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Thông tin công ty",
          desc:  "Xem và thiết lập các thông tin công ty.",
        },
      ],
    },
    {
      heading: "Thiết lập chi nhánh",
      cols:    3,
      cards: [
        {
          icon:  <ApartmentOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Thông tin chi nhánh",
          desc:  "Xem và thiết lập các thông tin chi nhánh.",
        },
      ],
    },
    {
      heading: "Thiết lập lương",
      cols:    3,
      cards: [
        {
          icon:  <CalculatorOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Thiết lập lương, thuế",
          desc:  "Xem và thiết lập các thông tin lương, thuế.",
        },
      ],
    },
  ];

  return (
    <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
      {sections.map((section) => (
        <div key={section.heading}>
          {/* Section heading */}
          <div
            style={{
              fontSize:      12,
              fontWeight:    700,
              color:         "#374151",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom:  10,
              paddingBottom: 8,
              borderBottom:  "2px solid #e5e7eb",
              display:       "flex",
              alignItems:    "center",
              gap:           8,
            }}
          >
            <div
              style={{
                width:        3,
                height:       14,
                background:   GREEN_PRIMARY,
                borderRadius: 2,
              }}
            />
            {section.heading}
          </div>

          {/* Cards grid */}
          <Row gutter={[12, 12]}>
            {section.cards.map((card) => (
              <Col key={card.title} xs={24} sm={12} lg={8}>
                <div
                  onClick={card.onClick}
                  style={{
                    background:   SURFACE_BG,
                    borderRadius: 8,
                    border:       `1px solid ${card.onClick ? "#bbf7d0" : "#e5e7eb"}`,
                    padding:      "13px 15px",
                    display:      "flex",
                    alignItems:   "flex-start",
                    gap:          13,
                    cursor:       card.onClick ? "pointer" : "default",
                    transition:   "all 0.15s",
                    boxShadow:    card.onClick ? `0 0 0 1px ${GREEN_PRIMARY}22` : "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 14px rgba(0,0,0,0.09)`;
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = card.onClick ? `0 0 0 1px ${GREEN_PRIMARY}22` : "none";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  {/* Icon box */}
                  <div
                    style={{
                      ...ICON_STYLE,
                      background: card.onClick ? "#f0fdf4" : "#f4f6f9",
                    }}
                  >
                    {card.icon}
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize:    13,
                        fontWeight:  700,
                        color:       card.onClick ? GREEN_PRIMARY : "#1a1a1a",
                        lineHeight:  "18px",
                        marginBottom: 3,
                      }}
                    >
                      {card.title}
                    </div>
                    <div
                      style={{
                        fontSize:   11.5,
                        color:      "#6b7280",
                        lineHeight: "1.55",
                      }}
                    >
                      {card.desc}
                    </div>
                  </div>

                  {card.onClick && (
                    <RightOutlined style={{ fontSize: 10, color: GREEN_PRIMARY, marginTop: 4, flexShrink: 0 }} />
                  )}
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
}

// ─── VIEW: Cấu Hình Hiển Thị Menu ─────────────────────────────────────────────
interface MenuToggleItem {
  key:        string;
  label:      string;
  depth:      number;
  expanded?:  boolean;
  children?:  MenuToggleItem[];
}

const MENU_TREE: MenuToggleItem[] = [
  {
    key: "ban-hang", label: "BÁN HÀNG", depth: 0,
    children: [
      { key: "tong-quan-m",  label: "Tổng Quan",               depth: 1 },
      {
        key: "mat-hang-m", label: "Mặt Hàng", depth: 1, expanded: true,
        children: [
          { key: "mat-hang-item-m",  label: "Mặt Hàng",       depth: 2 },
          { key: "thuc-don-m",       label: "Thực Đơn",        depth: 2 },
          { key: "bep-m",            label: "Bếp",             depth: 2 },
          { key: "danh-muc-m",       label: "Danh Mục",        depth: 2 },
          { key: "don-vi-tinh-m",    label: "Đơn Vị Tính",     depth: 2 },
          { key: "nhom-lua-chon-m",  label: "Nhóm Lựa Chọn",   depth: 2 },
          { key: "chinh-sach-gia-m", label: "Chính Sách Giá",  depth: 2 },
          { key: "gan-mat-hang-m",   label: "Gắn Mặt Hàng",    depth: 2 },
        ],
      },
      {
        key: "chuong-trinh-m", label: "Chương Trình Bán Hàng", depth: 1, expanded: true,
        children: [
          { key: "khuyen-mai-m",    label: "Khuyến Mãi",       depth: 2 },
          { key: "phi-dich-vu-m",   label: "Phí Dịch Vụ",      depth: 2 },
        ],
      },
      { key: "danh-sach-hd-m",  label: "Danh Sách Hoá Đơn",   depth: 1 },
      { key: "hoa-don-dt-m",    label: "Hoá Đơn Điện Tử",      depth: 1 },
      { key: "thu-ngan-m",      label: "Thu Ngân (POS)",        depth: 1 },
      {
        key: "dat-ban-m", label: "Đặt Bàn", depth: 1, expanded: true,
        children: [
          { key: "cau-hinh-db-m", label: "Cấu Hình Đặt Bàn",  depth: 2 },
          { key: "qr-ban-m",      label: "QR Theo Bàn",         depth: 2 },
        ],
      },
    ],
  },
  {
    key: "quan-ly-m", label: "QUẢN LÝ", depth: 0,
    children: [
      {
        key: "khach-hang-m", label: "Khách Hàng", depth: 1, expanded: true,
        children: [
          { key: "kh-ds-m",    label: "Khách Hàng",       depth: 2 },
          { key: "kh-nhom-m",  label: "Nhóm Khách Hàng",  depth: 2 },
        ],
      },
    ],
  },
];

function flattenTree(items: MenuToggleItem[]): MenuToggleItem[] {
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

function CauHinhMenuView({ onBack }: { onBack: () => void }) {
  const allFlat = flattenTree(MENU_TREE);
  const initialState = Object.fromEntries(allFlat.map((n) => [n.key, true]));
  const [switches, setSwitches] = useState<Record<string, boolean>>(initialState);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries(allFlat.filter((n) => n.expanded).map((n) => [n.key, true]))
  );

  const visibleCount = Object.values(switches).filter(Boolean).length;
  const totalCount   = allFlat.length;

  function toggle(key: string, val: boolean) {
    setSwitches((prev) => ({ ...prev, [key]: val }));
  }

  function toggleExpand(key: string) {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleReset() {
    setSwitches(initialState);
  }

  function renderTree(nodes: MenuToggleItem[], parentVisible = true): React.ReactNode {
    if (!parentVisible) return null;

    return nodes.map((node) => {
      const isGroup    = node.depth === 0;
      const isParent   = !isGroup && !!node.children?.length;
      const isExpanded = expanded[node.key] ?? false;
      const isVisible  = switches[node.key] ?? true;

      const indentPx = node.depth === 0 ? 0 : node.depth === 1 ? 16 : 40;

      return (
        <React.Fragment key={node.key}>
          {/* Row */}
          <div
            style={{
              display:        "flex",
              alignItems:     "center",
              padding:        isGroup ? "8px 16px" : "7px 16px",
              background:     isGroup ? "#f4f6f9" : "transparent",
              borderBottom:   "1px solid #f0f0f0",
              gap:            8,
            }}
          >
            {/* Indent + expand toggle */}
            <div style={{ width: indentPx, flexShrink: 0 }} />

            {isParent && (
              <button
                onClick={() => toggleExpand(node.key)}
                style={{
                  background: "none",
                  border:     "none",
                  cursor:     "pointer",
                  padding:    0,
                  color:      "#9ca3af",
                  display:    "flex",
                  alignItems: "center",
                  flexShrink: 0,
                  width:      14,
                  transition: "transform 0.15s",
                  transform:  isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                }}
              >
                <RightOutlined style={{ fontSize: 9 }} />
              </button>
            )}

            {!isParent && !isGroup && (
              <div style={{ width: 14, flexShrink: 0 }} />
            )}

            {/* Label */}
            <span
              style={{
                flex:       1,
                fontSize:   isGroup ? 11 : 13,
                fontWeight: isGroup ? 700 : isParent ? 600 : 400,
                color:      isGroup ? "#374151" : "#1a1a1a",
                letterSpacing: isGroup ? "0.06em" : 0,
                textTransform: isGroup ? "uppercase" as const : "none" as const,
              }}
            >
              {node.label}
            </span>

            {/* Switch */}
            <Switch
              size="small"
              checked={isVisible}
              onChange={(val) => toggle(node.key, val)}
              style={{ flexShrink: 0 }}
            />
          </div>

          {/* Children — for group rows always visible; for parent rows only when expanded */}
          {node.children && (
            renderTree(node.children, isGroup ? true : isExpanded)
          )}
        </React.Fragment>
      );
    });
  }

  return (
    <>
      {/* Page title bar */}
      <div
        style={{
          background:     SURFACE_BG,
          borderBottom:   "1px solid #e8e8e8",
          padding:        "0 24px",
          height:         54,
          display:        "flex",
          alignItems:     "center",
          gap:            12,
        }}
      >
        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            display:      "flex",
            alignItems:   "center",
            gap:          6,
            background:   "none",
            border:       "1px solid #d1d5db",
            borderRadius: 6,
            cursor:       "pointer",
            padding:      "5px 11px",
            color:        "#374151",
            fontSize:     12.5,
            fontWeight:   500,
            transition:   "all 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        >
          <ArrowLeftOutlined style={{ fontSize: 11 }} />
          Quay lại
        </button>

        <h1
          style={{
            margin:        0,
            fontSize:      14,
            fontWeight:    800,
            color:         "#111",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            flex:          1,
          }}
        >
          Cấu Hình Hiển Thị Menu
        </h1>

        {/* Counter + reset */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontSize:   13,
              color:      "#374151",
              fontWeight: 500,
              background: "#f0fdf4",
              border:     "1px solid #bbf7d0",
              borderRadius: 20,
              padding:    "3px 12px",
            }}
          >
            <span style={{ color: GREEN_PRIMARY, fontWeight: 700 }}>{visibleCount}</span>
            {" / "}
            <span style={{ fontWeight: 700 }}>{totalCount}</span>
            {" đang hiện"}
          </span>
          <Button
            onClick={handleReset}
            style={{
              height:      34,
              fontSize:    13,
              fontWeight:  500,
              color:       "#374151",
              borderColor: "#d1d5db",
            }}
          >
            Đặt lại
          </Button>
        </div>
      </div>

      {/* Toggle list */}
      <div style={{ padding: "20px 24px" }}>
        <div
          style={{
            background:   SURFACE_BG,
            borderRadius: 8,
            boxShadow:    "0 1px 4px rgba(0,0,0,0.07)",
            overflow:     "hidden",
            border:       "1px solid #e5e7eb",
          }}
        >
          {renderTree(MENU_TREE)}
        </div>
      </div>
    </>
  );
}

// ─── VIEW: Báo Cáo Tổng Quan (Placeholder) ───────────────────────────────────
function BaoCaoView({ onNavigateHome }: { onNavigateHome: () => void }) {
  return (
    <>
      {/* Page title bar */}
      <div
        style={{
          background:     SURFACE_BG,
          borderBottom:   "1px solid #e8e8e8",
          padding:        "0 24px",
          height:         54,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
        }}
      >
        <h1
          style={{
            margin:        0,
            fontSize:      14,
            fontWeight:    800,
            color:         "#111",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Báo Cáo Tổng Quan
        </h1>
      </div>

      {/* Centered placeholder */}
      <div
        style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          minHeight:      "calc(100vh - 52px - 54px)",
          padding:        40,
        }}
      >
        <div
          style={{
            background:   SURFACE_BG,
            borderRadius: 12,
            boxShadow:    "0 2px 16px rgba(0,0,0,0.07)",
            padding:      "56px 64px",
            textAlign:    "center",
            maxWidth:     540,
            width:        "100%",
          }}
        >
          {/* Icon circle */}
          <div
            style={{
              width:          88,
              height:         88,
              borderRadius:   "50%",
              background:     "#f0fdf4",
              border:         `2px dashed ${GREEN_PRIMARY}55`,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              margin:         "0 auto 28px",
            }}
          >
            <PieChartOutlined
              style={{
                fontSize: 42,
                color:    GREEN_PRIMARY,
              }}
            />
          </div>

          {/* Main text */}
          <h2
            style={{
              margin:     "0 0 12px",
              fontSize:   18,
              fontWeight: 700,
              color:      "#111827",
            }}
          >
            Giao diện Báo cáo đang được phát triển
          </h2>

          {/* Sub text */}
          <p
            style={{
              margin:     "0 0 32px",
              fontSize:   13.5,
              color:      "#6b7280",
              lineHeight: "1.65",
            }}
          >
            Hệ thống đang chuẩn bị cấu trúc dữ liệu để hiển thị biểu đồ doanh
            thu, thống kê và phân tích cây thư mục (Family Tree) tại đây.
          </p>

          {/* CTA button */}
          <Button
            type="primary"
            icon={<HomeOutlined />}
            onClick={onNavigateHome}
            style={{
              background:   GREEN_PRIMARY,
              borderColor:  GREEN_PRIMARY,
              fontWeight:   600,
              fontSize:     13,
              height:       38,
              paddingLeft:  20,
              paddingRight: 20,
              boxShadow:    `0 2px 8px ${GREEN_PRIMARY}55`,
            }}
          >
            Quay lại Trang chủ
          </Button>
        </div>
      </div>
    </>
  );
}

// ─── VIEW: Gán Mặt Hàng Cho Cửa Hàng ────────────────────────────────────────
interface GanMatHangRow {
  key:      string;
  name:     string;
  dvt:      string;
  giavon:   string;
  giaban:   string;
  bold?:    boolean;
  noIcon?:  boolean;
  children?: GanMatHangRow[];
}

const GAN_MAT_HANG_DATA: GanMatHangRow[] = [
  { key: "1", name: "Khăn giấy",         dvt: "",    giavon: "0 đ",      giaban: "20,000 đ" },
  { key: "2", name: "Kẹo Ong Chúa",      dvt: "Hộp", giavon: "0 đ",      giaban: "30,000 đ" },
  { key: "3", name: "Nước Suối Aqua",    dvt: "chai", giavon: "0 đ",      giaban: "20,000 đ" },
  {
    key:    "4",
    name:   "Cách chế biến",
    dvt:    "",
    giavon: "2 giá",
    giaban: "2 giá",
    bold:   true,
    children: [
      {
        key:    "4-1",
        name:   "Chiên",
        dvt:    "",
        giavon: "0 đ",
        giaban: "0 đ",
        noIcon: true,
        children: [],
      },
      {
        key:    "4-2",
        name:   "Xào",
        dvt:    "",
        giavon: "0 đ",
        giaban: "0 đ",
        noIcon: true,
        children: [
          {
            key:    "4-2-1",
            name:   "Xào chua ngọt",
            dvt:    "",
            giavon: "0 đ",
            giaban: "0 đ",
            noIcon: true,
          },
          {
            key:    "4-2-2",
            name:   "Xào tỏi",
            dvt:    "",
            giavon: "0 đ",
            giaban: "0 đ",
            noIcon: true,
          },
        ],
      },
    ],
  },
  {
    key:    "5",
    name:   "Bia largue",
    dvt:    "Lon",
    giavon: "2 giá",
    giaban: "2 giá",
    bold:   true,
    children: [
      { key: "5-1", name: "Bia 330ml", dvt: "Lon", giavon: "0 đ", giaban: "0 đ", noIcon: true },
      { key: "5-2", name: "Bia 500ml", dvt: "Lon", giavon: "0 đ", giaban: "0 đ", noIcon: true },
    ],
  },
  { key: "6", name: "Buffet 169K",        dvt: "",    giavon: "0 đ",      giaban: "0 đ" },
  { key: "7", name: "Combo bún + nước",   dvt: "",    giavon: "0 đ",      giaban: "59,000 đ" },
];

const GAN_MAT_HANG_COLUMNS: TableColumnsType<GanMatHangRow> = [
  {
    title:  "",
    key:    "action",
    width:  48,
    align:  "center" as const,
    render: (_: unknown, record: GanMatHangRow) =>
      record.noIcon ? null : (
        <div
          style={{
            width:          26,
            height:         26,
            borderRadius:   5,
            background:     "#fff1f0",
            border:         "1px solid #ffccc7",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            cursor:         "pointer",
            margin:         "0 auto",
          }}
        >
          <DeleteOutlined style={{ fontSize: 12, color: "#cf1322" }} />
        </div>
      ),
  },
  {
    title:     "Tên mặt hàng",
    dataIndex: "name",
    key:       "name",
    render:    (val: string, record: GanMatHangRow) => (
      <span style={{ fontWeight: record.bold ? 700 : 400, color: "#1a1a1a" }}>{val}</span>
    ),
  },
  {
    title:     "ĐVT",
    dataIndex: "dvt",
    key:       "dvt",
    width:     100,
    align:     "center" as const,
    render:    (val: string) => <span style={{ color: "#4b5563" }}>{val || "—"}</span>,
  },
  {
    title:     "Giá vốn",
    dataIndex: "giavon",
    key:       "giavon",
    width:     130,
    align:     "right" as const,
    render:    (val: string, record: GanMatHangRow) => (
      <span style={{ fontWeight: record.bold ? 700 : 400, color: record.bold ? "#1a1a1a" : "#374151" }}>
        {val}
      </span>
    ),
  },
  {
    title:     "Giá bán",
    dataIndex: "giaban",
    key:       "giaban",
    width:     130,
    align:     "right" as const,
    render:    (val: string, record: GanMatHangRow) => (
      <span style={{ fontWeight: record.bold ? 700 : 400, color: record.bold ? "#1a1a1a" : GREEN_PRIMARY }}>
        {val}
      </span>
    ),
  },
];

function GanMatHangView() {
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? GAN_MAT_HANG_DATA.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
      )
    : GAN_MAT_HANG_DATA;

  return (
    <>
      {/* Page title bar */}
      <div
        style={{
          background:     SURFACE_BG,
          borderBottom:   "1px solid #e8e8e8",
          padding:        "0 24px",
          height:         54,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
        }}
      >
        <h1
          style={{
            margin:        0,
            fontSize:      14,
            fontWeight:    800,
            color:         "#111",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Gán Mặt Hàng Cho Cửa Hàng
        </h1>

        <Button
          type="primary"
          icon={<SaveOutlined />}
          style={{
            background:   GREEN_PRIMARY,
            borderColor:  GREEN_PRIMARY,
            fontWeight:   600,
            fontSize:     13,
            height:       34,
            paddingLeft:  16,
            paddingRight: 16,
            boxShadow:    `0 2px 6px ${GREEN_PRIMARY}55`,
          }}
        >
          Lưu
        </Button>
      </div>

      {/* Page body */}
      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* ── Store selector card ── */}
        <div
          style={{
            background:   SURFACE_BG,
            borderRadius: 8,
            boxShadow:    "0 1px 4px rgba(0,0,0,0.07)",
            padding:      "16px 20px",
            display:      "flex",
            alignItems:   "center",
            gap:          16,
          }}
        >
          <label
            style={{
              fontSize:   13,
              fontWeight: 600,
              color:      "#374151",
              whiteSpace: "nowrap",
            }}
          >
            Cửa hàng áp dụng
            <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>
          </label>
          <Select
            defaultValue="store-1"
            style={{ width: 260, height: 34 }}
            options={[
              { value: "store-1", label: "Cửa hàng mặc định" },
            ]}
          />
        </div>

        {/* ── Toolbar ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            prefix={<SearchOutlined style={{ color: "#9ca3af", fontSize: 13 }} />}
            placeholder="Tìm kiếm..."
            style={{ width: 300, height: 34, borderRadius: 6, fontSize: 13 }}
            allowClear
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{
              background:   GREEN_PRIMARY,
              borderColor:  GREEN_PRIMARY,
              fontWeight:   600,
              fontSize:     13,
              height:       34,
              paddingLeft:  16,
              paddingRight: 16,
            }}
          >
            Chọn mặt hàng
          </Button>
        </div>

        {/* ── Tree table ── */}
        <div
          style={{
            background:   SURFACE_BG,
            borderRadius: 8,
            boxShadow:    "0 1px 4px rgba(0,0,0,0.07)",
            overflow:     "hidden",
          }}
        >
          <Table<GanMatHangRow>
            className="gmh-table"
            columns={GAN_MAT_HANG_COLUMNS}
            dataSource={filtered}
            pagination={false}
            size="small"
            defaultExpandedRowKeys={["4"]}
            expandable={{
              indentSize: 20,
              expandRowByClick: false,
            }}
            rowClassName={(record) => record.noIcon ? "gmh-child-row" : ""}
            style={{ borderRadius: 0 }}
            locale={{
              emptyText: (
                <div style={{ padding: "28px 0", textAlign: "center", color: "#9ca3af", fontSize: 13 }}>
                  Không có mặt hàng nào
                </div>
              ),
            }}
          />
        </div>
      </div>

      <style>{`
        .gmh-table .ant-table-thead > tr > th {
          background:   #b4c4c2 !important;
          color:        #1f2937 !important;
          font-weight:  700 !important;
          font-size:    12px !important;
          border-right: 1px solid #a8b9b6 !important;
        }
        .gmh-table .ant-table-thead > tr > th:last-child {
          border-right: none !important;
        }
        .gmh-child-row > td {
          background: #f8faf9 !important;
        }
        .gmh-child-row:hover > td {
          background: #f0fdf4 !important;
        }
        .gmh-table .ant-table-row-expand-icon {
          border-color: ${GREEN_PRIMARY}88 !important;
          color:        ${GREEN_PRIMARY} !important;
        }
      `}</style>
    </>
  );
}

// ─── VIEW: Cập Nhật Nhà Cung Cấp ────────────────────────────────────────────
const SUPPLIER_PRODUCT_COLUMNS: TableColumnsType<object> = [
  {
    title:     "Mã sản phẩm",
    dataIndex: "code",
    key:       "code",
    width:     140,
  },
  {
    title:     "Tên sản phẩm",
    dataIndex: "name",
    key:       "name",
  },
  {
    title:     "Đơn vị tính",
    dataIndex: "unit",
    key:       "unit",
    width:     120,
    align:     "center" as const,
  },
  {
    title:     "Giá bán",
    dataIndex: "price",
    key:       "price",
    width:     120,
    align:     "right" as const,
  },
  {
    title:     "SL. Tối thiểu",
    dataIndex: "minQty",
    key:       "minQty",
    width:     120,
    align:     "right" as const,
  },
];

function NhaCungCapView() {
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string | undefined>(undefined);

  const LABEL_STYLE: React.CSSProperties = {
    fontSize:    12.5,
    fontWeight:  600,
    color:       "#374151",
    marginBottom: 4,
    display:     "block",
  };
  const REQUIRED_STAR: React.CSSProperties = {
    color:       "#ef4444",
    marginLeft:  2,
  };
  const INPUT_STYLE: React.CSSProperties = {
    height:      34,
    borderRadius: 6,
    fontSize:    13,
    width:       "100%",
  };
  const CARD_STYLE: React.CSSProperties = {
    background:   SURFACE_BG,
    borderRadius: 8,
    boxShadow:    "0 1px 4px rgba(0,0,0,0.07)",
    padding:      "20px 20px 16px",
    height:       "100%",
  };

  return (
    <>
      {/* Page title bar */}
      <div
        style={{
          background:     SURFACE_BG,
          borderBottom:   "1px solid #e8e8e8",
          padding:        "0 24px",
          height:         54,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
        }}
      >
        <h1
          style={{
            margin:        0,
            fontSize:      14,
            fontWeight:    800,
            color:         "#111",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Cập Nhật Nhà Cung Cấp
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Button
            icon={<CloseOutlined />}
            style={{
              height:      34,
              fontSize:    13,
              fontWeight:  500,
              color:       "#374151",
              borderColor: "#d1d5db",
              background:  "#fff",
              paddingLeft:  14,
              paddingRight: 14,
            }}
          >
            Hủy
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            style={{
              background:  GREEN_PRIMARY,
              borderColor: GREEN_PRIMARY,
              fontWeight:  600,
              fontSize:    13,
              height:      34,
              paddingLeft:  16,
              paddingRight: 16,
              boxShadow:   `0 2px 6px ${GREEN_PRIMARY}55`,
            }}
          >
            Lưu
          </Button>
        </div>
      </div>

      {/* Page body */}
      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>

        {/* ── 3-column form ── */}
        <Row gutter={16} align="stretch">
          {/* Column 1 – basic info */}
          <Col span={8}>
            <div style={CARD_STYLE}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                <div>
                  <label style={LABEL_STYLE}>
                    Tên nhà cung cấp<span style={REQUIRED_STAR}>*</span>
                  </label>
                  <Input
                    defaultValue="NCC A"
                    style={INPUT_STYLE}
                    placeholder="Nhập tên nhà cung cấp"
                  />
                </div>

                <div>
                  <label style={LABEL_STYLE}>
                    Số điện thoại<span style={REQUIRED_STAR}>*</span>
                  </label>
                  <Input
                    defaultValue="0980000000"
                    prefix={<PhoneOutlined style={{ color: "#9ca3af", fontSize: 12 }} />}
                    style={INPUT_STYLE}
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div>
                  <label style={LABEL_STYLE}>Website</label>
                  <Input
                    prefix={<GlobalOutlined style={{ color: "#9ca3af", fontSize: 12 }} />}
                    style={INPUT_STYLE}
                    placeholder="Nhập website"
                  />
                </div>

                <div>
                  <label style={LABEL_STYLE}>Email</label>
                  <Input
                    prefix={<MailOutlined style={{ color: "#9ca3af", fontSize: 12 }} />}
                    style={INPUT_STYLE}
                    placeholder="Nhập địa chỉ email"
                  />
                </div>

              </div>
            </div>
          </Col>

          {/* Column 2 – currency + tax */}
          <Col span={8}>
            <div style={{ ...CARD_STYLE, position: "relative" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                <div>
                  <label style={LABEL_STYLE}>Người liên hệ</label>
                  <Input
                    defaultValue="pqedu"
                    prefix={<UserOutlined style={{ color: "#9ca3af", fontSize: 12 }} />}
                    style={INPUT_STYLE}
                  />
                </div>

                {/* Currency select with simulated open dropdown */}
                <div style={{ position: "relative" }}>
                  <label style={LABEL_STYLE}>
                    Đơn vị tiền tệ<span style={REQUIRED_STAR}>*</span>
                  </label>
                  <Select
                    open={currencyOpen}
                    onDropdownVisibleChange={(v) => setCurrencyOpen(v)}
                    value={selectedCurrency}
                    onChange={(v) => { setSelectedCurrency(v); setCurrencyOpen(false); }}
                    placeholder={
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <SearchOutlined style={{ fontSize: 12 }} />
                        Tìm loại tiền tệ
                      </span>
                    }
                    style={{ width: "100%", height: 34 }}
                    showSearch
                    filterOption={(input, option) =>
                      String(option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    dropdownRender={(menu) => (
                      <div>
                        <div style={{ padding: "6px 8px 4px" }}>
                          <Input
                            prefix={<SearchOutlined style={{ color: "#9ca3af", fontSize: 12 }} />}
                            placeholder="Tìm loại tiền tệ"
                            size="small"
                            style={{ borderRadius: 5, fontSize: 12 }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        {menu}
                      </div>
                    )}
                    options={[
                      { value: "VND", label: "Việt Nam Đồng" },
                      { value: "USD", label: "USD" },
                    ]}
                    optionRender={(option) => (
                      <div
                        style={{
                          padding:     "6px 10px",
                          fontSize:    13,
                          fontWeight:  option.value === "VND" ? 600 : 400,
                          background:  option.value === "VND" ? "#f0fdf4" : "transparent",
                          color:       option.value === "VND" ? GREEN_PRIMARY : "#374151",
                          borderRadius: 4,
                        }}
                      >
                        {option.label}
                      </div>
                    )}
                  />
                </div>

                <div>
                  <label style={LABEL_STYLE}>Mã số thuế</label>
                  <Input
                    style={INPUT_STYLE}
                    placeholder="Nhập mã số thuế"
                  />
                </div>

              </div>
            </div>
          </Col>

          {/* Column 3 – location */}
          <Col span={8}>
            <div style={CARD_STYLE}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                <div>
                  <label style={LABEL_STYLE}>
                    Cửa hàng<span style={REQUIRED_STAR}>*</span>
                  </label>
                  <Select
                    style={{ width: "100%", height: 34 }}
                    placeholder={
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <ShopOutlined style={{ fontSize: 12 }} />
                        Chọn cửa hàng
                      </span>
                    }
                    options={[{ value: "store-1", label: "Cửa hàng mặc định" }]}
                  />
                </div>

                <div>
                  <label style={LABEL_STYLE}>Tỉnh thành</label>
                  <Select
                    style={{ width: "100%", height: 34 }}
                    placeholder={
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <EnvironmentOutlined style={{ fontSize: 12 }} />
                        Chọn tỉnh thành
                      </span>
                    }
                    options={[
                      { value: "hcm",  label: "TP. Hồ Chí Minh" },
                      { value: "hn",   label: "Hà Nội" },
                      { value: "dn",   label: "Đà Nẵng" },
                    ]}
                    showSearch
                    allowClear
                  />
                </div>

                <div>
                  <label style={LABEL_STYLE}>Phường xã</label>
                  <Select
                    style={{ width: "100%", height: 34 }}
                    placeholder="Chọn phường xã"
                    options={[]}
                    allowClear
                  />
                </div>

                <div>
                  <label style={LABEL_STYLE}>Địa chỉ</label>
                  <Input
                    prefix={<EnvironmentOutlined style={{ color: "#9ca3af", fontSize: 12 }} />}
                    style={INPUT_STYLE}
                    placeholder="Nhập địa chỉ"
                  />
                </div>

              </div>
            </div>
          </Col>
        </Row>

        {/* ── Product selector + table ── */}
        <div
          style={{
            background:   SURFACE_BG,
            borderRadius: 8,
            boxShadow:    "0 1px 4px rgba(0,0,0,0.07)",
            overflow:     "hidden",
          }}
        >
          {/* Card header */}
          <div
            style={{
              padding:      "11px 18px",
              borderBottom: "1px solid #f0f0f0",
              display:      "flex",
              alignItems:   "center",
              justifyContent: "space-between",
              background:   "#fafcfb",
            }}
          >
            <span
              style={{
                fontWeight:    700,
                fontSize:      12,
                color:         "#1a1a1a",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Danh sách sản phẩm
            </span>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="small"
              style={{
                background:  GREEN_PRIMARY,
                borderColor: GREEN_PRIMARY,
                fontWeight:  500,
                fontSize:    12,
                height:      28,
              }}
            >
              Thêm sản phẩm
            </Button>
          </div>

          {/* Product picker */}
          <div style={{ padding: "14px 18px 0" }}>
            <Select
              style={{ width: "100%", height: 36 }}
              placeholder={
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <SearchOutlined style={{ fontSize: 12 }} />
                  Chọn sản phẩm
                </span>
              }
              showSearch
              options={[]}
              notFoundContent={
                <span style={{ fontSize: 12, color: "#9ca3af" }}>Không tìm thấy sản phẩm</span>
              }
            />
          </div>

          {/* Table with custom empty state */}
          <div style={{ padding: "14px 18px 18px" }}>
            <Table
              columns={SUPPLIER_PRODUCT_COLUMNS}
              dataSource={[]}
              pagination={false}
              size="small"
              className="ncc-table"
              locale={{
                emptyText: (
                  <div style={{ padding: "32px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                    {/* Custom folder-question illustration */}
                    <div
                      style={{
                        width:          72,
                        height:         72,
                        borderRadius:   "50%",
                        background:     "#f3f4f6",
                        display:        "flex",
                        alignItems:     "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Folder body */}
                        <rect x="4" y="14" width="32" height="20" rx="3" fill="#d1d5db"/>
                        {/* Folder tab */}
                        <path d="M4 14h10l3-4h15a3 3 0 0 1 3 3v1H4v-1z" fill="#9ca3af"/>
                        {/* Question mark */}
                        <text x="20" y="29" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6b7280">?</text>
                      </svg>
                    </div>
                    <span style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500 }}>
                      Chưa có dữ liệu
                    </span>
                  </div>
                ),
              }}
              style={{
                borderRadius: 6,
                overflow:     "hidden",
                border:       "1px solid #e5e7eb",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .ncc-table .ant-table-thead > tr > th {
          background: #b4c4c2 !important;
          color: #1f2937 !important;
          font-weight: 700 !important;
          font-size: 12px !important;
        }
      `}</style>
    </>
  );
}

// ─── Helper sub-components ────────────────────────────────────────────────────

function SettingCard({
  title,
  icon,
  children,
}: {
  title:    string;
  icon:     React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background:   "#ffffff",
        borderRadius: 8,
        boxShadow:    "0 1px 4px rgba(0,0,0,0.07)",
        overflow:     "hidden",
      }}
    >
      <div
        style={{
          padding:      "11px 16px",
          borderBottom: "1px solid #f0f0f0",
          display:      "flex",
          alignItems:   "center",
          gap:          8,
          background:   "#fafcfb",
        }}
      >
        <span style={{ color: GREEN_PRIMARY, fontSize: 13 }}>{icon}</span>
        <span
          style={{
            fontWeight:    700,
            fontSize:      12,
            color:         "#1a1a1a",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {title}
        </span>
      </div>
      <div style={{ padding: "2px 0" }}>{children}</div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  icon,
  valueColor = "#262626",
}: {
  label:       string;
  value:       string;
  icon?:       React.ReactNode;
  valueColor?: string;
}) {
  return (
    <div
      style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        padding:        "9px 16px",
        borderBottom:   "1px solid #fafafa",
        transition:     "background 0.1s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fffe")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span style={{ fontSize: 12.5, color: "#595959" }}>{label}</span>
      <span
        style={{
          fontSize:   12.5,
          fontWeight: 500,
          color:      valueColor,
          display:    "flex",
          alignItems: "center",
          gap:        5,
        }}
      >
        {icon}
        {value}
      </span>
    </div>
  );
}

function SwitchRow({
  label,
  description,
  checked,
}: {
  label:       string;
  description: string;
  checked:     boolean;
}) {
  const [on, setOn] = useState(checked);
  return (
    <div
      style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        padding:        "10px 16px",
        borderBottom:   "1px solid #fafafa",
        gap:            12,
        transition:     "background 0.1s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fffe")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div>
        <div style={{ fontSize: 12.5, fontWeight: 500, color: "#262626", lineHeight: "17px" }}>
          {label}
        </div>
        <div style={{ fontSize: 11, color: "#8c8c8c", lineHeight: "15px", marginTop: 1 }}>
          {description}
        </div>
      </div>
      <Switch size="small" checked={on} onChange={setOn} style={{ flexShrink: 0 }} />
    </div>
  );
}

function HoursRow({
  day,
  hours,
  active,
}: {
  day:    string;
  hours:  string;
  active: boolean;
}) {
  return (
    <div
      style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        padding:        "9px 16px",
        borderBottom:   "1px solid #fafafa",
        transition:     "background 0.1s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fffe")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <div
          style={{
            width:        6,
            height:       6,
            borderRadius: "50%",
            background:   active ? GREEN_ACCENT : "#d9d9d9",
            flexShrink:   0,
          }}
        />
        <span style={{ fontSize: 12.5, color: "#595959" }}>{day}</span>
      </div>
      <span
        style={{
          fontSize:           12.5,
          fontWeight:         500,
          color:              active ? "#262626" : "#bfbfbf",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {hours}
      </span>
    </div>
  );
}
