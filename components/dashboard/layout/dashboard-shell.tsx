"use client";

import { Layout } from "antd";
import { CONTENT_BG } from "@/constants/colors";
import { useDashboardNavigation } from "@/hooks/use-dashboard-navigation";
import { QueryProvider } from "@/components/providers/query-provider";
import { DashboardTheme } from "./dashboard-theme";
import { GlobalStyles } from "./global-styles";
import { Sidebar } from "./sidebar";
import { DashboardHeader } from "./header";
import { ViewRouter } from "../views/view-router";

const { Content } = Layout;

export default function DashboardShell() {
  const nav = useDashboardNavigation();

  return (
    <QueryProvider>
      <DashboardTheme>
        <Layout style={{ minHeight: "100vh", fontFamily: "inherit" }}>
          <Sidebar
            collapsed={nav.collapsed}
            onCollapsedChange={nav.setCollapsed}
            openKeys={nav.openKeys}
            onOpenKeysChange={nav.setOpenKeys}
            currentView={nav.currentView}
            onMenuSelect={nav.handleMenuSelect}
          />

          <Layout
            style={{
              marginLeft: nav.siderWidth,
              transition: "margin-left 0.2s",
              minHeight: "100vh",
            }}
          >
            <DashboardHeader meta={nav.meta} />

            <Content
              style={{
                background: CONTENT_BG,
                minHeight: "calc(100vh - 52px)",
              }}
            >
              <ViewRouter
                currentView={nav.currentView}
                activeTab={nav.activeTab}
                setActiveTab={nav.setActiveTab}
                systemSubView={nav.systemSubView}
                setSystemSubView={nav.setSystemSubView}
                onNavigateHome={() => nav.setCurrentView("user")}
              />
            </Content>
          </Layout>
        </Layout>
        <GlobalStyles />
      </DashboardTheme>
    </QueryProvider>
  );
}
