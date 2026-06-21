import type React from "react";
import { SURFACE_BG } from "@/constants/colors";

interface PageTitleBarProps {
  title: string;
  tag?: React.ReactNode;
  leftExtra?: React.ReactNode;
  actions?: React.ReactNode;
}

export function PageTitleBar({ title, tag, leftExtra, actions }: PageTitleBarProps) {
  return (
    <div
      style={{
        background: SURFACE_BG,
        borderBottom: "1px solid #e8e8e8",
        padding: "0 24px",
        height: 54,
        display: "flex",
        alignItems: "center",
        justifyContent: actions || tag ? "space-between" : "flex-start",
        gap: 12,
      }}
    >
      {leftExtra}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flex: leftExtra ? 1 : undefined }}>
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
      </div>
      {actions && <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{actions}</div>}
    </div>
  );
}
