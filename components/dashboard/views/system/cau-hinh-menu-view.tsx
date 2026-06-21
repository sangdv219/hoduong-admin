"use client";

import React, { useState } from "react";
import { Button, Switch } from "antd";
import { ArrowLeftOutlined, RightOutlined } from "@ant-design/icons";
import { GREEN_PRIMARY, SURFACE_BG } from "@/constants/colors";
import { MENU_TREE, flattenMenuTree } from "@/constants/menu-tree";
import type { MenuToggleItem } from "@/types/menu-toggle";
import { PageTitleBar } from "@/components/dashboard/shared/page-title-bar";

interface CauHinhMenuViewProps {
  onBack: () => void;
}

export function CauHinhMenuView({ onBack }: CauHinhMenuViewProps) {
  const allFlat = flattenMenuTree(MENU_TREE);
  const initialState = Object.fromEntries(allFlat.map((n) => [n.key, true]));
  const [switches, setSwitches] = useState<Record<string, boolean>>(initialState);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries(allFlat.filter((n) => n.expanded).map((n) => [n.key, true]))
  );

  const visibleCount = Object.values(switches).filter(Boolean).length;
  const totalCount = allFlat.length;

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
      const isGroup = node.depth === 0;
      const isParent = !isGroup && !!node.children?.length;
      const isExpanded = expanded[node.key] ?? false;
      const isVisible = switches[node.key] ?? true;
      const indentPx = node.depth === 0 ? 0 : node.depth === 1 ? 16 : 40;

      return (
        <React.Fragment key={node.key}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: isGroup ? "8px 16px" : "7px 16px",
              background: isGroup ? "#f4f6f9" : "transparent",
              borderBottom: "1px solid #f0f0f0",
              gap: 8,
            }}
          >
            <div style={{ width: indentPx, flexShrink: 0 }} />

            {isParent && (
              <button
                onClick={() => toggleExpand(node.key)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  color: "#9ca3af",
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                  width: 14,
                  transition: "transform 0.15s",
                  transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                }}
              >
                <RightOutlined style={{ fontSize: 9 }} />
              </button>
            )}

            {!isParent && !isGroup && <div style={{ width: 14, flexShrink: 0 }} />}

            <span
              style={{
                flex: 1,
                fontSize: isGroup ? 11 : 13,
                fontWeight: isGroup ? 700 : isParent ? 600 : 400,
                color: isGroup ? "#374151" : "#1a1a1a",
                letterSpacing: isGroup ? "0.06em" : 0,
                textTransform: isGroup ? ("uppercase" as const) : ("none" as const),
              }}
            >
              {node.label}
            </span>

            <Switch
              size="small"
              checked={isVisible}
              onChange={(val) => toggle(node.key, val)}
              style={{ flexShrink: 0 }}
            />
          </div>

          {node.children && renderTree(node.children, isGroup ? true : isExpanded)}
        </React.Fragment>
      );
    });
  }

  return (
    <>
      <PageTitleBar
        title="Cấu Hình Hiển Thị Menu"
        leftExtra={
          <button
            onClick={onBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "1px solid #d1d5db",
              borderRadius: 6,
              cursor: "pointer",
              padding: "5px 11px",
              color: "#374151",
              fontSize: 12.5,
              fontWeight: 500,
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            <ArrowLeftOutlined style={{ fontSize: 11 }} />
            Quay lại
          </button>
        }
        actions={
          <>
            <span
              style={{
                fontSize: 13,
                color: "#374151",
                fontWeight: 500,
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: 20,
                padding: "3px 12px",
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
                height: 34,
                fontSize: 13,
                fontWeight: 500,
                color: "#374151",
                borderColor: "#d1d5db",
              }}
            >
              Đặt lại
            </Button>
          </>
        }
      />

      <div style={{ padding: "20px 24px" }}>
        <div
          style={{
            background: SURFACE_BG,
            borderRadius: 8,
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
          }}
        >
          {renderTree(MENU_TREE)}
        </div>
      </div>
    </>
  );
}
