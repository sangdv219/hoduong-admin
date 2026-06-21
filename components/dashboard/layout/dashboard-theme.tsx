"use client";

import type React from "react";
import { ConfigProvider } from "antd";
import {
  GREEN_PRIMARY,
  GREEN_ACCENT,
  GREEN_DARK,
  SIDEBAR_BG,
  SIDEBAR_ITEM_BG,
  SIDEBAR_HOVER,
  SIDEBAR_ACTIVE,
  HEADER_BG,
  CONTENT_BG,
} from "@/constants/colors";

interface DashboardThemeProps {
  children: React.ReactNode;
}

export function DashboardTheme({ children }: DashboardThemeProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: GREEN_PRIMARY,
          colorSuccess: GREEN_ACCENT,
          borderRadius: 6,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          fontSize: 13,
        },
        components: {
          Layout: {
            siderBg: SIDEBAR_BG,
            headerBg: HEADER_BG,
            bodyBg: CONTENT_BG,
          },
          Menu: {
            darkItemBg: SIDEBAR_BG,
            darkSubMenuItemBg: SIDEBAR_ITEM_BG,
            darkItemSelectedBg: SIDEBAR_ACTIVE,
            darkItemHoverBg: SIDEBAR_HOVER,
            darkItemColor: "#b8d4c4",
            darkItemSelectedColor: "#ffffff",
            darkItemHoverColor: "#ffffff",
            darkGroupTitleColor: "#3d6b50",
            iconSize: 14,
            itemHeight: 36,
            groupTitleFontSize: 10,
            collapsedIconSize: 16,
            subMenuItemBorderRadius: 4,
            itemBorderRadius: 4,
            itemMarginInline: 6,
          },
          Breadcrumb: {
            itemColor: "#8c8c8c",
            lastItemColor: "#1a1a1a",
            separatorColor: "#bfbfbf",
            fontSize: 13,
          },
          Button: {
            borderRadius: 6,
          },
          Tabs: {
            inkBarColor: GREEN_PRIMARY,
            itemActiveColor: GREEN_PRIMARY,
            itemSelectedColor: GREEN_PRIMARY,
            itemHoverColor: GREEN_DARK,
          },
          Switch: {
            colorPrimary: GREEN_PRIMARY,
          },
          Table: {
            headerBg: "#dde6e4",
            headerColor: "#374151",
            headerSortActiveBg: "#cdd8d6",
            rowHoverBg: "#f9fffe",
            borderColor: "#e8eeec",
            fontSize: 13,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
