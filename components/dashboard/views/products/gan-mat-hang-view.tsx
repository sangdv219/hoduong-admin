"use client";

import { useState } from "react";
import { Button, Input, Select, Table } from "antd";
import { SaveOutlined, SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { GREEN_PRIMARY, SURFACE_BG } from "@/constants/colors";
import { GAN_MAT_HANG_DATA } from "@/data/gan-mat-hang";
import type { GanMatHangRow } from "@/types/gan-mat-hang";
import { PageTitleBar } from "@/components/dashboard/shared/page-title-bar";
import { GAN_MAT_HANG_COLUMNS } from "./gan-mat-hang-columns";

export function GanMatHangView() {
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? GAN_MAT_HANG_DATA.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
    : GAN_MAT_HANG_DATA;

  return (
    <>
      <PageTitleBar
        title="Gán Mặt Hàng Cho Cửa Hàng"
        actions={
          <Button
            type="primary"
            icon={<SaveOutlined />}
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
            Lưu
          </Button>
        }
      />

      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            background: SURFACE_BG,
            borderRadius: 8,
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <label
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#374151",
              whiteSpace: "nowrap",
            }}
          >
            Cửa hàng áp dụng
            <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>
          </label>
          <Select
            defaultValue="store-1"
            style={{ width: 260, height: 34 }}
            options={[{ value: "store-1", label: "Cửa hàng mặc định" }]}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            prefix={<SearchOutlined style={{ color: "#9ca3af", fontSize: 13 }} />}
            placeholder="Tìm kiếm..."
            style={{ width: 300, height: 34, borderRadius: 6, fontSize: 13 }}
            allowClear
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{
              background: GREEN_PRIMARY,
              borderColor: GREEN_PRIMARY,
              fontWeight: 600,
              fontSize: 13,
              height: 34,
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            Chọn mặt hàng
          </Button>
        </div>

        <div
          style={{
            background: SURFACE_BG,
            borderRadius: 8,
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            overflow: "hidden",
          }}
        >
          <Table<GanMatHangRow>
            className="gmh-table"
            columns={GAN_MAT_HANG_COLUMNS}
            dataSource={filtered}
            pagination={false}
            size="small"
            defaultExpandedRowKeys={["4"]}
            expandable={{
              indentSize: 20,
              expandRowByClick: false,
            }}
            rowClassName={(record) => (record.noIcon ? "gmh-child-row" : "")}
            style={{ borderRadius: 0 }}
            locale={{
              emptyText: (
                <div
                  style={{
                    padding: "28px 0",
                    textAlign: "center",
                    color: "#9ca3af",
                    fontSize: 13,
                  }}
                >
                  Không có mặt hàng nào
                </div>
              ),
            }}
          />
        </div>
      </div>
    </>
  );
}
