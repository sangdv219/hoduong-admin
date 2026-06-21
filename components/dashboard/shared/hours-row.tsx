import { GREEN_ACCENT } from "@/constants/colors";

interface HoursRowProps {
  day: string;
  hours: string;
  active: boolean;
}

export function HoursRow({ day, hours, active }: HoursRowProps) {
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
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: active ? GREEN_ACCENT : "#d9d9d9",
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: 12.5, color: "#595959" }}>{day}</span>
      </div>
      <span
        style={{
          fontSize: 12.5,
          fontWeight: 500,
          color: active ? "#262626" : "#bfbfbf",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {hours}
      </span>
    </div>
  );
}
