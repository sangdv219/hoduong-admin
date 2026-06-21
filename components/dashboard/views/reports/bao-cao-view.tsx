"use client";

import { Button } from "antd";
import { HomeOutlined, PieChartOutlined } from "@ant-design/icons";
import { GREEN_PRIMARY, SURFACE_BG } from "@/constants/colors";
import { PageTitleBar } from "@/components/dashboard/shared/page-title-bar";

interface BaoCaoViewProps {
  onNavigateHome: () => void;
}

export function BaoCaoView({ onNavigateHome }: BaoCaoViewProps) {
  return (
    <>
      <PageTitleBar title="Báo Cáo Tổng Quan" />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 52px - 54px)",
          padding: 40,
        }}
      >
        <div
          style={{
            background: SURFACE_BG,
            borderRadius: 12,
            boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
            padding: "56px 64px",
            textAlign: "center",
            maxWidth: 540,
            width: "100%",
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              background: "#f0fdf4",
              border: `2px dashed ${GREEN_PRIMARY}55`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px",
            }}
          >
            <PieChartOutlined style={{ fontSize: 42, color: GREEN_PRIMARY }} />
          </div>

          <h2
            style={{
              margin: "0 0 12px",
              fontSize: 18,
              fontWeight: 700,
              color: "#111827",
            }}
          >
            Giao diện Báo cáo đang được phát triển
          </h2>

          <p
            style={{
              margin: "0 0 32px",
              fontSize: 13.5,
              color: "#6b7280",
              lineHeight: "1.65",
            }}
          >
            Hệ thống đang chuẩn bị cấu trúc dữ liệu để hiển thị biểu đồ doanh thu, thống kê và phân
            tích cây thư mục (Family Tree) tại đây.
          </p>

          <Button
            type="primary"
            icon={<HomeOutlined />}
            onClick={onNavigateHome}
            style={{
              background: GREEN_PRIMARY,
              borderColor: GREEN_PRIMARY,
              fontWeight: 600,
              fontSize: 13,
              height: 38,
              paddingLeft: 20,
              paddingRight: 20,
              boxShadow: `0 2px 8px ${GREEN_PRIMARY}55`,
            }}
          >
            Quay lại Trang chủ
          </Button>
        </div>
      </div>
    </>
  );
}
