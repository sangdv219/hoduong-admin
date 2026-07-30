import type React from "react";
import { HEADER_BG, SURFACE_BG } from "@/constants/colors";

interface PageTitleBarProps {
  title: string;
  tag?: React.ReactNode;
  leftExtra?: React.ReactNode;
  actions?: React.ReactNode;
}

export function PageTitleBar({
  title,
  tag,
  leftExtra,
  actions,
}: PageTitleBarProps) {
  return (
    <div
      style={{
        background: HEADER_BG,
        borderBottom: "1px solid #e8e8e8",
        padding: "0 24px",
        height: 54,
        display: "flex",
        alignItems: "center",
        // Không dùng space-between nữa vì ta muốn gom cụm tiêu đề và actions về một phía
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      {/* Nhóm bên trái: chứa leftExtra và cụm (Title + Tag + Actions) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16, // Khoảng cách giữa các thành phần
          flex: leftExtra ? 1 : undefined,
        }}
      >
        {leftExtra}

        {/* Cụm chính: Title, Tag và Actions nằm chung ở đây */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 800,
              color: "#111",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {title}
          </h1>
          {tag}

          {/* Actions được chuyển vào đây để nằm ngay cạnh title/tag */}
          {actions && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
