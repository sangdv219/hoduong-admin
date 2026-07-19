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
import {
  useCreatePerson,
  usePersonDetail,
  useUpdatePerson,
} from "@/hooks/use-persons";
import { personToFormValues } from "@/utils/person";
import type { CreatePersonDTO, UpdatePersonDTO } from "@/types/person";

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
  { value: 1, label: "Còn sống" },
  { value: 0, label: "Đã mất" },
];

export function PersonFormModal({
  open,
  personId,
  onClose,
}: PersonFormModalProps) {
  const [form] = Form.useForm();
  const isEdit = !!personId;

  const { data: person, isLoading: loadingDetail } = usePersonDetail(
    open && personId ? personId : null,
  );
  const createMutation = useCreatePerson();
  const updateMutation = useUpdatePerson();

  const submitting = createMutation.isPending || updateMutation.isPending;

  // CHỈ THỰC THI KHI MODAL ĐƯỢC MỞ
  useEffect(() => {
    if (!open) return; // Nếu đóng thì không làm gì cả, tránh gọi form instance lỗi

    // Xóa dữ liệu cũ của lần bật trước đó để tránh lag data
    form.resetFields();

    if (isEdit && person) {
      const values = personToFormValues(person);
      form.setFieldsValue({
        ...values,
        birth_date: values.birth_date ? dayjs(values.birth_date) : null,
      });
    } else if (!isEdit) {
      form.setFieldsValue({
        email: "abc@gmail.com",
        password: "1234567",
        other_name: "sang duong",
        gender: "Nam",
        phone: "0919528956",
        address: "aasp 14",
        status: 1,
        is_active: false,
      });
    }
  }, [open, isEdit, person, form]);

  async function handleSubmit() {
    try {
      const values = await form.validateFields();

      const formattedBirth = values.birth_date
        ? dayjs(values.birth_date).format("YYYY-MM-DD")
        : null;

      if (isEdit && personId) {
        const payload: UpdatePersonDTO = {
          gender: values.gender,
          other_name: values.other_name || null,
          password: values.password,
          phone: values.phone || null,
          roleId: "026e2174-aff3-4461-9f43-0e16c9a88f17",
          birth_date: formattedBirth,
          year_of_death: values.year_of_death ?? null,
          burial_place: values.burial_place || null,
          address: values.address || null,
          biography: values.biography || null,
          status: values.status,
          email: values.email || null,
          is_active: values.is_active,
        };
        await updateMutation.mutateAsync({ id: personId, payload });
      } else {
        const payload: CreatePersonDTO = {
          email: values.email,
          fullname: values.fullname,
          password: values.password,
          roleId: "026e2174-aff3-4461-9f43-0e16c9a88f17",
          other_name: values.other_name || null,
          gender: values.gender,
          phone: values.phone || null,
          birth_date: formattedBirth,
          burial_place: values.burial_place || null,
          address: values.address || null,
          biography: values.biography || null,
          status: values.status || 1,
          is_active: values.is_active,
        };
        console.log("payload", payload);
        await createMutation.mutateAsync(payload);
      }

      onClose();
    } catch (error) {
      console.error("Submit thất bại:", error);
    }
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
      // forceRender // <-- THÊM THUỘC TÍNH NÀY: Ép buộc render form ngầm để khởi tạo kết nối form instance
      width={640}
    >
      <Spin spinning={isEdit && loadingDetail}>
        <Form layout="vertical" style={{ marginTop: 16 }} form={form}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Vui lòng nhập đúng định dạng email",
              },
            ]}
          >
            <Input placeholder="duong@example.com" disabled={isEdit} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            initialValue={"abc123@45"}
          >
            <Input placeholder="1234567" disabled={true} />
          </Form.Item>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <Form.Item
              name="fullname"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
            >
              <Input placeholder="Nguyen Duong" />
            </Form.Item>
            <Form.Item name="other_name" label="Tên khác">
              <Input placeholder="Duong Nguyen" />
            </Form.Item>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
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
                {
                  pattern: /^0[0-9]{9}$/,
                  message: "Số điện thoại không hợp lệ",
                },
              ]}
            >
              <Input placeholder="0909090909" />
            </Form.Item>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
            }}
          >
            <Form.Item
              name="birth_date"
              label="Ngày sinh123"
              rules={[{ required: false }]}
            >
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>

            <Form.Item name="year_of_death" label="Năm mất">
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                max={2100}
                placeholder="Năm mất"
              />
            </Form.Item>

            <Form.Item name="burial_place" label="Nơi an táng">
              <Input placeholder="Nghĩa trang..." />
            </Form.Item>
          </div>

          <Form.Item name="address" label="Địa chỉ sống">
            <Input placeholder="123 Đường ABC, Quận XYZ, TP. HCM" />
          </Form.Item>

          <Form.Item name="biography" label="Tiểu sử">
            <Input.TextArea rows={3} placeholder="Thông tin tiểu sử..." />
          </Form.Item>

          {isEdit && (
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
                name="is_active"
                label="Kích hoạt"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </div>
          )}
        </Form>
      </Spin>
    </Modal>
  );
}
