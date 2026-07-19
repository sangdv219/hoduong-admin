"use client";

import { useState } from "react";
import { Button, Input, Select, Table, Tooltip } from "antd";
import {
  EditOutlined,
  SearchOutlined,
  ShopOutlined,
  ClockCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { GREEN_PRIMARY, SURFACE_BG } from "@/constants/colors";
import { CUSTOMER_DATA } from "@/data/customers";
import type { CustomerDTO } from "@/types/customer";
import { PageTitleBar } from "@/components/dashboard/shared/page-title-bar";
import { CUSTOMER_COLUMNS } from "./customer-columns";

export function KhachHangThanhVienView() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  return (
    <>
      <PageTitleBar
        title="Khách Hàng Thành Viên"
        actions={
          <Button
            type="primary"
            icon={<EditOutlined />}
            style={{
              background: GREEN_PRIMARY,
              borderColor: GREEN_PRIMARY,
              fontWeight: 600,
              fontSize: 13,
              height: 34,
              paddingLeft: 16,
              paddingRight: 16,
              boxShadow: `0 2px 6px ${GREEN_PRIMARY}55`,
            }}
          >
            Thêm khách hàng
          </Button>
        }
      />

      <div
        style={{
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            background: SURFACE_BG,
            borderRadius: 8,
            padding: "14px 18px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <Input
            prefix={<SearchOutlined style={{ color: "#9ca3af" }} />}
            placeholder="Tìm kiếm..."
            style={{ width: 300, height: 34, borderRadius: 6, fontSize: 13 }}
            allowClear
          />

          <Select
            placeholder={
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <ShopOutlined style={{ fontSize: 12 }} />
                Chọn cửa hàng
              </span>
            }
            style={{ width: 180, height: 34 }}
            options={[
              { value: "all", label: "Tất cả cửa hàng" },
              { value: "store-1", label: "Cửa hàng 1" },
            ]}
            allowClear
          />

          <Select
            placeholder={
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <ClockCircleOutlined style={{ fontSize: 12 }} />
                Thời gian
              </span>
            }
            style={{ width: 160, height: 34 }}
            options={[
              { value: "today", label: "Hôm nay" },
              { value: "week", label: "Tuần này" },
              { value: "month", label: "Tháng này" },
              { value: "custom", label: "Tùy chỉnh" },
            ]}
            allowClear
          />

          <Select
            placeholder="Chọn trạng thái"
            style={{ width: 170, height: 34 }}
            options={[
              { value: "active", label: "Đang hoạt động" },
              { value: "inactive", label: "Ngừng hoạt động" },
            ]}
            allowClear
          />

          <Tooltip title="Làm mới">
            <Button
              icon={<ReloadOutlined />}
              shape="circle"
              style={{
                width: 34,
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6b7280",
                borderColor: "#d1d5db",
                flexShrink: 0,
              }}
            />
          </Tooltip>
        </div>

        <div
          style={{
            background: SURFACE_BG,
            borderRadius: 8,
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            overflow: "hidden",
          }}
        >
          <Table<CustomerDTO>
            rowSelection={{
              selectedRowKeys,
              onChange: (keys) => setSelectedRowKeys(keys),
            }}
            columns={CUSTOMER_COLUMNS}
            dataSource={CUSTOMER_DATA}
            pagination={{
              pageSize: 13,
              showSizeChanger: false,
              showTotal: (total) => (
                <span style={{ fontSize: 12, color: "#6b7280" }}>
                  Tổng {total} khách hàng
                </span>
              ),
              style: { padding: "10px 16px", margin: 0 },
            }}
            size="small"
            rowKey="key"
            style={{ fontSize: 13 }}
            rowClassName={(_, index) =>
              index % 2 === 0 ? "row-even" : "row-odd"
            }
          />
        </div>
      </div>
    </>
  );
}
