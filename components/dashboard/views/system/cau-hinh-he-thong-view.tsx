"use client";

import type React from "react";
import { Row, Col } from "antd";
import {
  SettingOutlined,
  CalendarOutlined,
  PrinterOutlined,
  DollarOutlined,
  NotificationOutlined,
  FireOutlined,
  MenuUnfoldOutlined,
  ScissorOutlined,
  FileProtectOutlined,
  BankOutlined,
  InfoCircleOutlined,
  ApartmentOutlined,
  CalculatorOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { GREEN_PRIMARY, SURFACE_BG } from "@/constants/colors";
import type { SystemSubView } from "@/types/dashboard";
import type { SysSection } from "@/types/system";
import { CauHinhMenuView } from "./cau-hinh-menu-view";

interface CauHinhHeThongViewProps {
  systemSubView: SystemSubView;
  setSystemSubView: (view: SystemSubView) => void;
}

export function CauHinhHeThongView({ systemSubView, setSystemSubView }: CauHinhHeThongViewProps) {
  if (systemSubView === "cau-hinh-menu") {
    return <CauHinhMenuView onBack={() => setSystemSubView(null)} />;
  }

  const ICON_STYLE: React.CSSProperties = {
    width: 38,
    height: 38,
    borderRadius: 8,
    background: "#f0f2f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  const sections: SysSection[] = [
    {
      heading: "Thiết lập chức năng",
      cols: 3,
      cards: [
        {
          icon: <SettingOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Thiết lập bán hàng",
          desc: "Xem và thiết lập thông tin bán hàng, ca làm việc.",
        },
        {
          icon: <CalendarOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Thiết lập bàn",
          desc: "Xem và thiết lập quản lí bàn trong nhà hàng.",
        },
        {
          icon: <PrinterOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Thiết lập mẫu in",
          desc: "Xem và thiết lập mẫu in của nhà hàng.",
        },
        {
          icon: <DollarOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Điều chỉnh giá vốn mặt hàng",
          desc: "Xem và điều chỉnh giá vốn của mặt hàng cho cửa hàng.",
        },
        {
          icon: <NotificationOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Thiết lập thông báo",
          desc: "Xem và thiết lập người nhận thông báo.",
        },
        {
          icon: <FireOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Thiết lập in phiếu bếp",
          desc: "Xem và thiết lập in phiếu bếp.",
        },
        {
          icon: <MenuUnfoldOutlined style={{ fontSize: 18, color: GREEN_PRIMARY }} />,
          title: "Cấu hình Menu",
          desc: "Ẩn, hiện các tính năng trong Menu.",
          onClick: () => setSystemSubView("cau-hinh-menu"),
        },
        {
          icon: <ScissorOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Cân điện tử",
          desc: "Cấu hình mã cân điện tử.",
        },
      ],
    },
    {
      heading: "Thiết lập đối tác",
      cols: 3,
      cards: [
        {
          icon: <FileProtectOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Hoá đơn điện tử",
          desc: "Quản lí kết nối hoá đơn điện tử trong cửa hàng.",
        },
        {
          icon: <BankOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Ví điện tử",
          desc: "Xem và thiết lập các tài khoản người nhận, ví điện tử của nhà hàng.",
        },
      ],
    },
    {
      heading: "Thiết lập thông tin",
      cols: 3,
      cards: [
        {
          icon: <InfoCircleOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Thông tin công ty",
          desc: "Xem và thiết lập các thông tin công ty.",
        },
      ],
    },
    {
      heading: "Thiết lập chi nhánh",
      cols: 3,
      cards: [
        {
          icon: <ApartmentOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Thông tin chi nhánh",
          desc: "Xem và thiết lập các thông tin chi nhánh.",
        },
      ],
    },
    {
      heading: "Thiết lập lương",
      cols: 3,
      cards: [
        {
          icon: <CalculatorOutlined style={{ fontSize: 18, color: "#52525b" }} />,
          title: "Thiết lập lương, thuế",
          desc: "Xem và thiết lập các thông tin lương, thuế.",
        },
      ],
    },
  ];

  return (
    <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
      {sections.map((section) => (
        <div key={section.heading}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#374151",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 10,
              paddingBottom: 8,
              borderBottom: "2px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 3,
                height: 14,
                background: GREEN_PRIMARY,
                borderRadius: 2,
              }}
            />
            {section.heading}
          </div>

          <Row gutter={[12, 12]}>
            {section.cards.map((card) => (
              <Col key={card.title} xs={24} sm={12} lg={8}>
                <div
                  onClick={card.onClick}
                  style={{
                    background: SURFACE_BG,
                    borderRadius: 8,
                    border: `1px solid ${card.onClick ? "#bbf7d0" : "#e5e7eb"}`,
                    padding: "13px 15px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 13,
                    cursor: card.onClick ? "pointer" : "default",
                    transition: "all 0.15s",
                    boxShadow: card.onClick ? `0 0 0 1px ${GREEN_PRIMARY}22` : "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 4px 14px rgba(0,0,0,0.09)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = card.onClick
                      ? `0 0 0 1px ${GREEN_PRIMARY}22`
                      : "none";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      ...ICON_STYLE,
                      background: card.onClick ? "#f0fdf4" : "#f4f6f9",
                    }}
                  >
                    {card.icon}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: card.onClick ? GREEN_PRIMARY : "#1a1a1a",
                        lineHeight: "18px",
                        marginBottom: 3,
                      }}
                    >
                      {card.title}
                    </div>
                    <div
                      style={{
                        fontSize: 11.5,
                        color: "#6b7280",
                        lineHeight: "1.55",
                      }}
                    >
                      {card.desc}
                    </div>
                  </div>

                  {card.onClick && (
                    <RightOutlined
                      style={{ fontSize: 10, color: GREEN_PRIMARY, marginTop: 4, flexShrink: 0 }}
                    />
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
