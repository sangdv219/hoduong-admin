import type React from "react";
import { GREEN_PRIMARY } from "@/constants/colors";

interface SettingCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function SettingCard({ title, icon, children }: SettingCardProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 8,
        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "11px 16px",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#fafcfb",
        }}
      >
        <span style={{ color: GREEN_PRIMARY, fontSize: 13 }}>{icon}</span>
        <span
          style={{
            fontWeight: 700,
            fontSize: 12,
            color: "#1a1a1a",
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
