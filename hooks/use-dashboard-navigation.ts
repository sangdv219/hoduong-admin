"use client";

import { useEffect, useState } from "react";
import { Grid } from "antd";
import type { ViewKey, SystemSubView, ViewMeta } from "@/types/dashboard";
import { isViewKey } from "@/types/dashboard";
import { VIEW_META, SYSTEM_MENU_BREADCRUMB } from "@/constants/breadcrumbs";

export function useDashboardNavigation() {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>(["mat-hang"]);
  const [currentView, setCurrentView] = useState<ViewKey>("family-members");
  const [activeTab, setActiveTab] = useState("mat-hang-config");
  const [systemSubView, setSystemSubView] = useState<SystemSubView>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const screens = Grid.useBreakpoint();
  // `screens` is empty on the first (server + hydration) render, so treat
  // "unknown" as desktop to keep the markup stable, then correct on mount.
  const isMobile = screens.lg === false;

  // Never keep the mobile drawer mounted once we grow back to desktop.
  useEffect(() => {
    if (!isMobile && mobileNavOpen) setMobileNavOpen(false);
  }, [isMobile, mobileNavOpen]);

  const siderWidth = isMobile ? 0 : collapsed ? 64 : 240;
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
    // The mobile nav is a temporary overlay, so dismiss it on any leaf tap —
    // including keys with no view yet, which would otherwise leave the drawer
    // stuck open with no feedback.
    setMobileNavOpen(false);
  }

  return {
    isMobile,
    mobileNavOpen,
    setMobileNavOpen,
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
