"use client";

import { Button, Tag, Tabs, Divider } from "antd";
import {
  CalendarOutlined,
  SaveOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  BellOutlined,
  AccountBookOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import { GREEN_PRIMARY, SURFACE_BG } from "@/constants/colors";
import { PageTitleBar } from "@/components/dashboard/shared/page-title-bar";
import { SettingCard } from "@/components/dashboard/shared/setting-card";
import { InfoRow } from "@/components/dashboard/shared/info-row";
import { SwitchRow } from "@/components/dashboard/shared/switch-row";
import { HoursRow } from "@/components/dashboard/shared/hours-row";

interface CauHinhDatBanViewProps {
  activeTab: string;
  setActiveTab: (key: string) => void;
}

export function CauHinhDatBanView({ activeTab, setActiveTab }: CauHinhDatBanViewProps) {
  return (
    <>
      <PageTitleBar
        title="Cấu Hình Website"
        tag={
          <Tag
            style={{
              background: "#fff1f0",
              color: "#cf1322",
              border: "1px solid #ffccc7",
              borderRadius: 4,
              fontWeight: 600,
              fontSize: 11,
              padding: "1px 8px",
              letterSpacing: "0.02em",
              margin: 0,
              cursor: "default",
            }}
          >
            Ngừng hoạt động
          </Tag>
        }
        actions={
          <>
            <Button
              icon={<SaveOutlined />}
              style={{
                fontSize: 13,
                height: 34,
                paddingLeft: 14,
                paddingRight: 14,
                color: "#595959",
                borderColor: "#d9d9d9",
                fontWeight: 500,
              }}
            >
              Lưu nháp
            </Button>
            <Button
              type="primary"
              icon={<GlobalOutlined />}
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
              Xuất bản
            </Button>
          </>
        }
      />

      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            background: SURFACE_BG,
            borderRadius: 8,
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            overflow: "hidden",
          }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            style={{ padding: "0 20px" }}
            items={[
              { key: "thong-tin", label: "Thông tin chung" },
              { key: "giao-dien", label: "Giao diện" },
              { key: "dat-ban-config", label: "Cài đặt đặt bàn" },
              { key: "thong-bao", label: "Thông báo" },
            ]}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <SettingCard title="Cài đặt đặt bàn" icon={<CalendarOutlined />}>
              <SwitchRow
                label="Cho phép đặt bàn trực tuyến"
                description="Hiển thị form đặt bàn trên website"
                checked
              />
              <Divider style={{ margin: "4px 0" }} />
              <InfoRow label="Số người tối thiểu / bàn" value="1 người" />
              <InfoRow label="Số người tối đa / bàn" value="20 người" />
              <InfoRow label="Đặt trước tối thiểu" value="30 phút" />
              <InfoRow label="Thời gian hủy tối thiểu" value="60 phút" />
              <Divider style={{ margin: "4px 0" }} />
              <SwitchRow
                label="Xác nhận thủ công"
                description="Nhân viên duyệt từng đặt bàn"
                checked
              />
              <SwitchRow
                label="Yêu cầu số điện thoại"
                description="Bắt buộc nhập SĐT khi đặt bàn"
                checked={false}
              />
            </SettingCard>

            <SettingCard title="Thông tin nhà hàng" icon={<EnvironmentOutlined />}>
              <InfoRow label="Tên nhà hàng" value="Nhà Hàng Bado" />
              <InfoRow label="Địa chỉ" value="123 Nguyễn Huệ, Q.1, TP.HCM" />
              <InfoRow
                label="Điện thoại"
                value="028 3822 6688"
                icon={<PhoneOutlined style={{ color: GREEN_PRIMARY, fontSize: 11 }} />}
              />
              <InfoRow
                label="Email"
                value="contact@bado.vn"
                icon={<MailOutlined style={{ color: GREEN_PRIMARY, fontSize: 11 }} />}
              />
              <InfoRow label="Sức chứa tối đa" value="200 khách" />
            </SettingCard>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <SettingCard title="Giờ hoạt động" icon={<ClockCircleOutlined />}>
              <HoursRow day="Thứ 2 – Thứ 6" hours="10:00 – 22:00" active />
              <HoursRow day="Thứ 7" hours="09:00 – 23:00" active />
              <HoursRow day="Chủ Nhật" hours="09:00 – 22:00" active />
              <HoursRow day="Ngày lễ" hours="Theo lịch" active={false} />
            </SettingCard>

            <SettingCard title="Thông báo tự động" icon={<BellOutlined />}>
              <SwitchRow
                label="Xác nhận qua SMS"
                description="Gửi SMS sau khi đặt bàn thành công"
                checked
              />
              <SwitchRow
                label="Nhắc nhở trước 2 giờ"
                description="Nhắc khách trước giờ đặt bàn"
                checked
              />
              <SwitchRow
                label="Thông báo hủy đặt bàn"
                description="Gửi SMS khi khách hủy"
                checked
              />
              <Divider style={{ margin: "4px 0" }} />
              <InfoRow label="Ngôn ngữ thông báo" value="Tiếng Việt" />
              <InfoRow label="Số điện thoại gửi" value="+84 028 xxxx" />
            </SettingCard>

            <SettingCard title="Chính sách đặt cọc" icon={<AccountBookOutlined />}>
              <SwitchRow
                label="Yêu cầu đặt cọc"
                description="Khách phải cọc trước khi đặt bàn"
                checked={false}
              />
              <Divider style={{ margin: "4px 0" }} />
              <InfoRow label="Số tiền đặt cọc" value="—" valueColor="#bfbfbf" />
              <InfoRow label="Chính sách hoàn cọc" value="Chưa cấu hình" valueColor="#bfbfbf" />
              <InfoRow label="Thời hạn hoàn cọc" value="—" valueColor="#bfbfbf" />
            </SettingCard>
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #0a1f14 0%, #1a3d28 100%)",
            borderRadius: 10,
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#fff",
            boxShadow: "0 4px 16px rgba(10,31,20,0.35)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 10,
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <QrcodeOutlined style={{ fontSize: 24, color: "#7fffc4" }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>
                QR Đặt Bàn Trực Tuyến
              </div>
              <div style={{ fontSize: 12, color: "#8dc9aa" }}>
                Chia sẻ mã QR để khách hàng đặt bàn ngay trên điện thoại
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <Button
              icon={<QrcodeOutlined />}
              size="middle"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                fontWeight: 500,
                fontSize: 12,
                height: 34,
              }}
            >
              Xem QR
            </Button>
            <Button
              type="primary"
              size="middle"
              style={{
                background: GREEN_PRIMARY,
                borderColor: GREEN_PRIMARY,
                fontWeight: 600,
                fontSize: 12,
                height: 34,
                boxShadow: `0 2px 8px ${GREEN_PRIMARY}80`,
              }}
            >
              Tải xuống
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
