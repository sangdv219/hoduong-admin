"use client";

import { useState } from "react";
import type React from "react";
import { Button, Input, Select, Table, Row, Col } from "antd";
import {
  CloseOutlined,
  SaveOutlined,
  PhoneOutlined,
  GlobalOutlined,
  MailOutlined,
  UserOutlined,
  SearchOutlined,
  ShopOutlined,
  EnvironmentOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { GREEN_PRIMARY, SURFACE_BG } from "@/constants/colors";
import { PageTitleBar } from "@/components/dashboard/shared/page-title-bar";
import { SUPPLIER_PRODUCT_COLUMNS } from "./supplier-columns";

export function NhaCungCapView() {
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string | undefined>(undefined);

  const LABEL_STYLE: React.CSSProperties = {
    fontSize: 12.5,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 4,
    display: "block",
  };
  const REQUIRED_STAR: React.CSSProperties = {
    color: "#ef4444",
    marginLeft: 2,
  };
  const INPUT_STYLE: React.CSSProperties = {
    height: 34,
    borderRadius: 6,
    fontSize: 13,
    width: "100%",
  };
  const CARD_STYLE: React.CSSProperties = {
    background: SURFACE_BG,
    borderRadius: 8,
    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
    padding: "20px 20px 16px",
    height: "100%",
  };

  return (
    <>
      <PageTitleBar
        title="Cập Nhật Nhà Cung Cấp"
        actions={
          <>
            <Button
              icon={<CloseOutlined />}
              style={{
                height: 34,
                fontSize: 13,
                fontWeight: 500,
                color: "#374151",
                borderColor: "#d1d5db",
                background: "#fff",
                paddingLeft: 14,
                paddingRight: 14,
              }}
            >
              Hủy
            </Button>
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
          </>
        }
      />

      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
        <Row gutter={16} align="stretch">
          <Col span={8}>
            <div style={CARD_STYLE}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={LABEL_STYLE}>
                    Tên nhà cung cấp<span style={REQUIRED_STAR}>*</span>
                  </label>
                  <Input
                    defaultValue="NCC A"
                    style={INPUT_STYLE}
                    placeholder="Nhập tên nhà cung cấp"
                  />
                </div>

                <div>
                  <label style={LABEL_STYLE}>
                    Số điện thoại<span style={REQUIRED_STAR}>*</span>
                  </label>
                  <Input
                    defaultValue="0980000000"
                    prefix={<PhoneOutlined style={{ color: "#9ca3af", fontSize: 12 }} />}
                    style={INPUT_STYLE}
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div>
                  <label style={LABEL_STYLE}>Website</label>
                  <Input
                    prefix={<GlobalOutlined style={{ color: "#9ca3af", fontSize: 12 }} />}
                    style={INPUT_STYLE}
                    placeholder="Nhập website"
                  />
                </div>

                <div>
                  <label style={LABEL_STYLE}>Email</label>
                  <Input
                    prefix={<MailOutlined style={{ color: "#9ca3af", fontSize: 12 }} />}
                    style={INPUT_STYLE}
                    placeholder="Nhập địa chỉ email"
                  />
                </div>
              </div>
            </div>
          </Col>

          <Col span={8}>
            <div style={{ ...CARD_STYLE, position: "relative" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={LABEL_STYLE}>Người liên hệ</label>
                  <Input
                    defaultValue="pqedu"
                    prefix={<UserOutlined style={{ color: "#9ca3af", fontSize: 12 }} />}
                    style={INPUT_STYLE}
                  />
                </div>

                <div style={{ position: "relative" }}>
                  <label style={LABEL_STYLE}>
                    Đơn vị tiền tệ<span style={REQUIRED_STAR}>*</span>
                  </label>
                  <Select
                    open={currencyOpen}
                    onOpenChange={(v) => setCurrencyOpen(v)}
                    value={selectedCurrency}
                    onChange={(v) => {
                      setSelectedCurrency(v);
                      setCurrencyOpen(false);
                    }}
                    placeholder={
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <SearchOutlined style={{ fontSize: 12 }} />
                        Tìm loại tiền tệ
                      </span>
                    }
                    style={{ width: "100%", height: 34 }}
                    showSearch
                    filterOption={(input, option) =>
                      String(option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    dropdownRender={(menu) => (
                      <div>
                        <div style={{ padding: "6px 8px 4px" }}>
                          <Input
                            prefix={<SearchOutlined style={{ color: "#9ca3af", fontSize: 12 }} />}
                            placeholder="Tìm loại tiền tệ"
                            size="small"
                            style={{ borderRadius: 5, fontSize: 12 }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        {menu}
                      </div>
                    )}
                    options={[
                      { value: "VND", label: "Việt Nam Đồng" },
                      { value: "USD", label: "USD" },
                    ]}
                    optionRender={(option) => (
                      <div
                        style={{
                          padding: "6px 10px",
                          fontSize: 13,
                          fontWeight: option.value === "VND" ? 600 : 400,
                          background: option.value === "VND" ? "#f0fdf4" : "transparent",
                          color: option.value === "VND" ? GREEN_PRIMARY : "#374151",
                          borderRadius: 4,
                        }}
                      >
                        {option.label}
                      </div>
                    )}
                  />
                </div>

                <div>
                  <label style={LABEL_STYLE}>Mã số thuế</label>
                  <Input style={INPUT_STYLE} placeholder="Nhập mã số thuế" />
                </div>
              </div>
            </div>
          </Col>

          <Col span={8}>
            <div style={CARD_STYLE}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={LABEL_STYLE}>
                    Cửa hàng<span style={REQUIRED_STAR}>*</span>
                  </label>
                  <Select
                    style={{ width: "100%", height: 34 }}
                    placeholder={
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <ShopOutlined style={{ fontSize: 12 }} />
                        Chọn cửa hàng
                      </span>
                    }
                    options={[{ value: "store-1", label: "Cửa hàng mặc định" }]}
                  />
                </div>

                <div>
                  <label style={LABEL_STYLE}>Tỉnh thành</label>
                  <Select
                    style={{ width: "100%", height: 34 }}
                    placeholder={
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <EnvironmentOutlined style={{ fontSize: 12 }} />
                        Chọn tỉnh thành
                      </span>
                    }
                    options={[
                      { value: "hcm", label: "TP. Hồ Chí Minh" },
                      { value: "hn", label: "Hà Nội" },
                      { value: "dn", label: "Đà Nẵng" },
                    ]}
                    showSearch
                    allowClear
                  />
                </div>

                <div>
                  <label style={LABEL_STYLE}>Phường xã</label>
                  <Select
                    style={{ width: "100%", height: 34 }}
                    placeholder="Chọn phường xã"
                    options={[]}
                    allowClear
                  />
                </div>

                <div>
                  <label style={LABEL_STYLE}>Địa chỉ</label>
                  <Input
                    prefix={<EnvironmentOutlined style={{ color: "#9ca3af", fontSize: 12 }} />}
                    style={INPUT_STYLE}
                    placeholder="Nhập địa chỉ"
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <div
          style={{
            background: SURFACE_BG,
            borderRadius: 8,
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "11px 18px",
              borderBottom: "1px solid #f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#fafcfb",
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: 12,
                color: "#1a1a1a",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Danh sách sản phẩm
            </span>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="small"
              style={{
                background: GREEN_PRIMARY,
                borderColor: GREEN_PRIMARY,
                fontWeight: 500,
                fontSize: 12,
                height: 28,
              }}
            >
              Thêm sản phẩm
            </Button>
          </div>

          <div style={{ padding: "14px 18px 0" }}>
            <Select
              style={{ width: "100%", height: 36 }}
              placeholder={
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <SearchOutlined style={{ fontSize: 12 }} />
                  Chọn sản phẩm
                </span>
              }
              showSearch
              options={[]}
              notFoundContent={
                <span style={{ fontSize: 12, color: "#9ca3af" }}>Không tìm thấy sản phẩm</span>
              }
            />
          </div>

          <div style={{ padding: "14px 18px 18px" }}>
            <Table
              columns={SUPPLIER_PRODUCT_COLUMNS}
              dataSource={[]}
              pagination={false}
              size="small"
              className="ncc-table"
              locale={{
                emptyText: (
                  <div
                    style={{
                      padding: "32px 0",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        background: "#f3f4f6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect x="4" y="14" width="32" height="20" rx="3" fill="#d1d5db" />
                        <path
                          d="M4 14h10l3-4h15a3 3 0 0 1 3 3v1H4v-1z"
                          fill="#9ca3af"
                        />
                        <text
                          x="20"
                          y="29"
                          textAnchor="middle"
                          fontSize="13"
                          fontWeight="700"
                          fill="#6b7280"
                        >
                          ?
                        </text>
                      </svg>
                    </div>
                    <span style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500 }}>
                      Chưa có dữ liệu
                    </span>
                  </div>
                ),
              }}
              style={{
                borderRadius: 6,
                overflow: "hidden",
                border: "1px solid #e5e7eb",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
