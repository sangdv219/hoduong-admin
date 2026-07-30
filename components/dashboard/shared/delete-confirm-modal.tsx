"use client";

import { Modal, Button } from "antd";
import { DeleteOutlined, StopOutlined, CloseOutlined } from "@ant-design/icons";
import React from "react";
import { HEADER_BG, RED_PRIMARY } from "@/constants/colors";

interface DeleteConfirmModalProps {
  open: boolean;
  selectedCount?: number;
  itemName?: string;
  entityName?: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export function DeleteConfirmModal({
  open,
  selectedCount = 0,
  itemName,
  entityName = "dữ liệu",
  onClose,
  onConfirm,
  loading = false,
}: DeleteConfirmModalProps) {
  const entityNameUpper = entityName.toUpperCase();

  const titleText =
    selectedCount > 1
      ? `XÓA ${selectedCount} ${entityNameUpper}`
      : `XÓA ${entityNameUpper}`;

  const descriptionText = itemName
    ? `Bạn có chắc chắn muốn xóa ${entityName} "${itemName}" không?`
    : selectedCount > 1
      ? `Bạn có chắc chắn muốn xóa ${selectedCount} ${entityName} đã chọn không?`
      : `Bạn có chắc chắn muốn xóa ${entityName} đang chọn không?`;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={610}
      height={44}
      className="delete-confirm-modal"
      closeIcon={
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1e293b",
            fontSize: 12,
            fontWeight: "bold",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          }}
        >
          <CloseOutlined />
        </div>
      }
      styles={{
        header: {
          background: RED_PRIMARY,
          padding: "16px 24px",
          marginBottom: 0,
          margin: 0,
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
        },
        body: {
          padding: 0,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          overflow: "hidden",
        },
      }}
      title={
        <span
          style={{
            color: HEADER_BG,
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: 0.5,
          }}
        >
          {titleText}
        </span>
      }
    >
      <div
        style={{
          padding: "36px 24px 32px",
          textAlign: "center",
          fontSize: 16,
          fontWeight: 500,
          color: "#1f2937",
          lineHeight: 1.5,
        }}
      >
        {descriptionText}
      </div>

      {/* Đường kẻ ngang & các nút hành động */}
      <div
        style={{
          borderTop: "1px solid #eef2f6",
          padding: "16px 24px 20px",
          display: "flex",
          justifyContent: "center",
          gap: 14,
        }}
      >
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined style={{ fontSize: 18 }} />}
          onClick={onConfirm}
          loading={loading}
          style={{
            background: "#ff4242",
            borderColor: "#ff4242",
            borderRadius: 10,
            height: 40,
            padding: "0 15px",
            fontWeight: 800,
            fontSize: 15,
            boxShadow: "0 2px 6px rgba(255,66,66,0.25)",
          }}
        >
          Xóa
        </Button>

        <Button
          onClick={onClose}
          disabled={loading}
          icon={<StopOutlined style={{ fontSize: 17 }} />}
          style={{
            background: "#cbe0ee",
            borderColor: "#cbe0ee",
            color: "#223344",
            borderRadius: 10,
            height: 40,
            padding: "0 15px",
            fontWeight: 800,
            fontSize: 15,
          }}
        >
          Hủy
        </Button>
      </div>
    </Modal>
  );
}
