import type React from "react";

interface InfoRowProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  valueColor?: string;
}

export function InfoRow({ label, value, icon, valueColor = "#262626" }: InfoRowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "9px 16px",
        borderBottom: "1px solid #fafafa",
        transition: "background 0.1s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fffe")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span style={{ fontSize: 12.5, color: "#595959" }}>{label}</span>
      <span
        style={{
          fontSize: 12.5,
          fontWeight: 500,
          color: valueColor,
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        {icon}
        {value}
      </span>
    </div>
  );
}
