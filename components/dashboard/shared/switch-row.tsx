"use client";

import { useState } from "react";
import { Switch } from "antd";

interface SwitchRowProps {
  label: string;
  description: string;
  checked: boolean;
}

export function SwitchRow({ label, description, checked }: SwitchRowProps) {
  const [on, setOn] = useState(checked);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        borderBottom: "1px solid #fafafa",
        gap: 12,
        transition: "background 0.1s",
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
