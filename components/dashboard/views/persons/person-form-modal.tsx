"use client";

import { useEffect } from "react";
import {
  Form,
  Input,
  Modal,
  Select,
  DatePicker,
  InputNumber,
  Switch,
  Spin,
} from "antd";
import dayjs from "dayjs";
import { DEFAULT_FAMILY_ID } from "@/constants/api";
import {
  useCreatePerson,
  usePersonDetail,
  useUpdatePerson,
} from "@/hooks/use-persons";
import { personToFormValues } from "@/utils/person";
import type {
  CreatePersonDTO,
  PersonFormValues,
  UpdatePersonDTO,
} from "@/types/person";
import { InfoCircleOutlined } from "@ant-design/icons";

interface PersonFormModalProps {
  open: boolean;
  personId: string | null;
  onClose: () => void;
}

const GENDER_OPTIONS = [
  { value: "Nam", label: "Nam" },
  { value: "Nữ", label: "Nữ" },
];

const STATUS_OPTIONS = [
  { value: "ALIVE", label: "Còn sống" },
  { value: "DECEASED", label: "Đã mất" },
];

export function PersonFormModal({
  open,
  personId,
  onClose,
}: PersonFormModalProps) {
  const [form] = Form.useForm<PersonFormValues>();
  const isEdit = !!personId;

  const { data: person, isLoading: loadingDetail } = usePersonDetail(
    open && personId ? personId : null,
  );
  const createMutation = useCreatePerson();
  const updateMutation = useUpdatePerson();

  const submitting = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (!open) {
      form.resetFields();
      return;
    }

    if (isEdit && person) {
      const values = personToFormValues(person);
      form.setFieldsValue({
        ...values,
        birthDate: values.birthDate,
      });
    } else if (!isEdit) {
      form.setFieldsValue({
        // familyId: DEFAULT_FAMILY_ID,
        gender: "Nam",
        status: "Còn sống",
        isActive: true,
      });
    }
  }, [open, isEdit, person, form]);

  async function handleSubmit() {
    const values = await form.validateFields();
    const birthDate =
      typeof values.birthDate === "string"
        ? values.birthDate
        : dayjs(values.birthDate as unknown as string).format("YYYY-MM-DD");

    if (isEdit && personId) {
      const payload: UpdatePersonDTO = {
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender,
        birthDate,
        otherName: values.otherName || null,
        yearOfDeath: values.yearOfDeath ?? null,
        burialPlace: values.burialPlace || null,
        address: values.address || null,
        biography: values.biography || null,
        status: values.status,
        email: values.email || null,
        isActive: values.isActive,
      };
      await updateMutation.mutateAsync({ id: personId, payload });
    } else {
      const payload: CreatePersonDTO = {
        familyId: values.familyId,
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender,
        birthDate,
        email: values.email,
      };
      await createMutation.mutateAsync(payload);
    }

    onClose();
  }

  return (
    <Modal
      title={isEdit ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText={isEdit ? "Lưu" : "Thêm"}
      cancelText="Hủy"
      confirmLoading={submitting}
      destroyOnHidden
      width={640}
    >
      <Spin spinning={isEdit && loadingDetail}>
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="familyId"
            label="Mã gia tộc"
            rules={[{ required: true, message: "Vui lòng nhập mã gia tộc" }]}
          >
            <Input placeholder="family-uuid-1111" disabled={isEdit} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
          >
            <Input
              placeholder="duong@example.com"
              type="email"
              disabled={isEdit}
            />
          </Form.Item>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Form.Item
              name="fullname"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
            >
              <Input placeholder="Nguyen Duong" />
            </Form.Item>
            <Form.Item
              name="otherName"
              label="Tên khác"
              rules={[{ required: false }]}
            >
              <Input placeholder="Duong Nguyen" />
            </Form.Item>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Form.Item
              name="gender"
              label="Giới tính"
              rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
            >
              <Select options={GENDER_OPTIONS} />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: false },
                {
                  pattern: /^0[0-9]{9}$/,
                  message: "Số điện thoại không hợp lệ",
                },
              ]}
            >
              <Input placeholder="0909090909" />
            </Form.Item>

            <Form.Item
              name="birthDate"
              label="Ngày sinh"
              rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
              getValueProps={(value) => ({
                value: value ? dayjs(value) : undefined,
              })}
              normalize={(value) => (value ? value.format("YYYY-MM-DD") : "")}
            >
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>
            <Form.Item
              name="year_of_death"
              label="Năm mất"
              rules={[{ required: false }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={2026}
                max={2100}
                placeholder="Năm mất"
              />
            </Form.Item>
            <Form.Item
              name="burial_place"
              label="Nơi an táng"
              rules={[{ required: false }]}
            >
              <Input placeholder="Nghĩa trang..." />
            </Form.Item>
          </div>
          <Form.Item
            name="address"
            label="Địa chỉ sống"
            rules={[{ required: false }]}
          >
            <Input placeholder="123 Đường ABC, Quận XYZ, TP. HCM" />
          </Form.Item>
          <Form.Item
            name="biography"
            label="Tiểu sử"
            rules={[{ required: false }]}
          >
            <Input.TextArea rows={3} placeholder="Thông tin tiểu sử..." />
          </Form.Item>

          {isEdit && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Form.Item name="status" label="Trạng thái">
                  <Select options={STATUS_OPTIONS} />
                </Form.Item>
                <Form.Item
                  name="isActive"
                  label="Kích hoạt"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </div>
            </>
          )}
        </Form>
      </Spin>
    </Modal>
  );
}
