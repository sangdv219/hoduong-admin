"use client";

import { GENDER_OPTIONS, Status, STATUS_OPTIONS } from "@/constants/api";
import {
  useCreatePerson,
  usePersonDetail,
  useUpdatePerson,
} from "@/hooks/use-persons";
import type { CreatePersonDTO, UpdatePersonDTO } from "@/types/person";
import { personToFormValues } from "@/utils/person";
import { DatePicker, Form, Input, Modal, Select, Spin, Switch } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface PersonFormModalProps {
  open: boolean;
  personId: string | null;
  onClose: () => void;
}

function useFormValid(form: any, open: boolean, loading: boolean) {
  const [submittable, setSubmittable] = useState(false);
  const values = Form.useWatch([], form); // Theo dõi toàn bộ thay đổi dữ liệu trong form

  useEffect(() => {
    // Nếu modal chưa mở hoặc đang load detail thì tạm thời chưa validate
    if (!open || loading) {
      setSubmittable(false);
      return;
    }

    form
      .validateFields({ validateOnly: true })
      .then(
        () => setSubmittable(true),
        () => setSubmittable(false),
      )
      .catch(() => setSubmittable(false));
  }, [form, values, open, loading]);

  return submittable;
}

export function PersonFormModal({
  open,
  personId,
  onClose,
}: PersonFormModalProps) {
  const [form] = Form.useForm();
  const isEdit = !!personId;
  const currentStatus = Form.useWatch("life_status", form);
  const { data: person, isLoading: loadingDetail } = usePersonDetail(
    open && personId ? personId : null,
  );

  const isFormValid = useFormValid(form, open, loadingDetail);
  const createMutation = useCreatePerson();
  const updateMutation = useUpdatePerson();

  const submitting = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (!open) return; // Nếu đóng thì không làm gì cả, tránh gọi form instance lỗi

    // Xóa dữ liệu cũ của lần bật trước đó để tránh lag data
    form.resetFields();

    if (isEdit && person) {
      const values = personToFormValues(person);
      form.setFieldsValue({
        ...values,
        birth_date: values.birth_date ? dayjs(values.birth_date) : null,
        year_of_death: values.year_of_death
          ? dayjs(values.year_of_death)
          : null,
      });

      form.validateFields({ validateOnly: false }).catch(() => {});
    } else if (!isEdit) {
      form.setFieldsValue({
        email: "",
        password: "1234567",
        other_name: "",
        gender: 0,
        phone: "",
        birth_date: "",
        life_status: 1,
        year_of_death: "",
        burial_place: "",
        address: "",
        biography: "",
      });
      form.validateFields({ validateOnly: true }).catch(() => {});
    }
  }, [open, isEdit, person, form]);

  async function handleSubmit() {
    try {
      const values = await form.validateFields();
      // --- LOGIC TÍNH TOÁN TUỔI (AGE) ---
      let age: number | null = null;

      if (values.birth_date) {
        const birthDate = dayjs(values.birth_date);

        // ĐÚNG YÊU CẦU: Có ngày mất thì lấy ngày mất, không có thì lấy thời điểm hiện tại
        const endDate = values.year_of_death
          ? dayjs(values.year_of_death)
          : dayjs();

        // Tính toán độ chênh lệch theo số năm (làm tròn xuống hoàn toàn theo thực tế)
        const calculatedAge = endDate.diff(birthDate, "year");

        // Bắt buộc tránh số âm nếu nhập liệu sai lệch ngày tháng
        age = calculatedAge < 0 ? 0 : calculatedAge;
      }

      if (isEdit && personId) {
        const payload: UpdatePersonDTO = {
          fullname: values.fullname,
          roleId: "026e2174-aff3-4461-9f43-0e16c9a88f17",
          other_name: values.other_name,
          gender: values.gender,
          phone: values.phone || null,
          birth_date: values.birth_date
            ? dayjs(values.birth_date).toISOString()
            : null,
          life_status: values.life_status,
          year_of_death: values.year_of_death
            ? dayjs(values.year_of_death).toISOString()
            : null,
          age: age,
          burial_place: values.burial_place || null,
          address: values.address || null,
          biography: values.biography || null,
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
          birth_date: values.birth_date
            ? dayjs(values.birth_date).toISOString()
            : null,
          life_status: values.life_status,
          year_of_death: values.year_of_death
            ? dayjs(values.year_of_death).toISOString()
            : null,
          burial_place: values.burial_place || null,
          age: age,
          address: values.address || null,
          biography: values.biography || null,
        };

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
      okButtonProps={{ disabled: !isFormValid }}
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

          <Form.Item name="password" label="Mật khẩu" initialValue={"1234567"}>
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
            <Form.Item name="gender" label="Giới tính">
              <Select options={GENDER_OPTIONS} />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                {
                  required: true,
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
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <Form.Item
              name="birth_date"
              label="Ngày sinh"
              rules={[{ required: false }]}
            >
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>

            <Form.Item name="life_status" label="Tình trạng">
              <Select options={STATUS_OPTIONS} />
            </Form.Item>

            {currentStatus == 0 && (
              <>
                <Form.Item name="year_of_death" label="Thời điểm mất">
                  <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
                </Form.Item>

                <Form.Item name="burial_place" label="Nơi an táng">
                  <Input placeholder="Nghĩa trang..." />
                </Form.Item>
              </>
            )}
          </div>

          <Form.Item name="address" label="Địa chỉ sống">
            <Input placeholder="123 Đường ABC, Quận XYZ, TP. HCM" />
          </Form.Item>

          <Form.Item name="biography" label="Tiểu sử">
            <Input.TextArea rows={3} placeholder="Thông tin tiểu sử..." />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}
