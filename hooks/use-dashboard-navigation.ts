"use client";

import { useState } from "react";
import type { ViewKey, SystemSubView, ViewMeta } from "@/types/dashboard";
import { isViewKey } from "@/types/dashboard";
import { VIEW_META, SYSTEM_MENU_BREADCRUMB } from "@/constants/breadcrumbs";

export function useDashboardNavigation() {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>(["dat-ban"]);
  const [currentView, setCurrentView] = useState<ViewKey>("cau-hinh-dat-ban");
  const [activeTab, setActiveTab] = useState("dat-ban-config");
  const [systemSubView, setSystemSubView] = useState<SystemSubView>(null);

  const siderWidth = collapsed ? 64 : 240;
  const baseMeta = VIEW_META[currentView];

  const meta: ViewMeta =
    currentView === "cau-hinh-he-thong" && systemSubView === "cau-hinh-menu"
      ? { ...baseMeta, breadcrumb: SYSTEM_MENU_BREADCRUMB }
      : baseMeta;

  function handleMenuSelect({ key }: { key: string }) {
    if (isViewKey(key)) {
      setCurrentView(key);
      if (key === "cau-hinh-he-thong") setSystemSubView(null);
    }
  }

  return {
    collapsed,
    setCollapsed,
    openKeys,
    setOpenKeys,
    currentView,
    setCurrentView,
    activeTab,
    setActiveTab,
    systemSubView,
    setSystemSubView,
    siderWidth,
    meta,
    handleMenuSelect,
  };
}
