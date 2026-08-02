"use client";

import {
  GENDER_OPTIONS,
  STATUS_MARRIE_OPTIONS,
  STATUS_OPTIONS,
} from "@/constants/api";
import { useUsers } from "@/hooks/use-user";
import {
  useCreateFamilyMembers,
  useUpdateFamilyMembers,
} from "@/hooks/use-family-members";
import { useFamilyMembersDetail } from "@/hooks/use-family-members";
import {
  formFamilyMembersDefault,
  familyMembersToFormValues,
} from "@/utils/family-members-form";
import { DatePicker, Form, Input, Modal, Select, Spin } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  CreateFamilyMembersDTO,
  UpdateFamilyMembersDTO,
} from "@/types/family-members";

interface FamilyMembersFormModalProps {
  open: boolean;
  familyMembersId: string | null;
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

export function FamilyMembersFormModal({
  open,
  familyMembersId,
  onClose,
}: FamilyMembersFormModalProps) {
  const [form] = Form.useForm();
  const isEdit = !!familyMembersId;
  const currentMarriedStatus = Form.useWatch("marriage_status", form);
  const { data: familyMembers, isLoading: loadingDetail } =
    useFamilyMembersDetail(open && familyMembersId ? familyMembersId : null);
  const { data: users, isLoading: isLoadingUser } = useUsers({});
  const isFormValid = useFormValid(form, open, loadingDetail);
  const createMutation = useCreateFamilyMembers();
  const updateMutation = useUpdateFamilyMembers();
  const submitting = createMutation.isPending || updateMutation.isPending;

  console.log("currentMarriedStatus", currentMarriedStatus);
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
      if (isEdit && familyMembersId) {
        const payload: UpdateFamilyMembersDTO = {
          fullname: values.fullname,
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
          roles:
            values.roles?.map((r: any) =>
              typeof r === "object" ? r.value : r,
            ) || [],
        };
        console.log("payload", payload);

        await updateMutation.mutateAsync({ id: familyMembersId, payload });
      } else {
        const payload: CreateFamilyMembersDTO = {
          user_id: values.user_id,
          father_id: values.father_id,
        };
        await createMutation.mutateAsync(payload);
      }
      onClose();
    } catch (error) {
      console.error("Submit thất bại:", error);
    }
  }

  useEffect(() => {
    if (!open) return; // Nếu đóng thì không làm gì cả, tránh gọi form instance lỗi

    // Xóa dữ liệu cũ của lần bật trước đó để tránh lag data
    form.resetFields();

    if (isEdit && familyMembers) {
      const values = familyMembersToFormValues(familyMembers.items);
      form.setFieldsValue({
        ...values,
      });

      form.validateFields({ validateOnly: false }).catch(() => {});
    } else if (!isEdit) {
      form.setFieldsValue(formFamilyMembersDefault);
      form.validateFields({ validateOnly: true }).catch(() => {});
    }
  }, [open, isEdit, familyMembers, form]);

  return (
    <Modal
      title={isEdit ? "Chỉnh sửa phả hệ" : "Thêm phả hệ"}
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
            name="user_id"
            label="Tên người vào phả hệ"
            rules={[
              { required: true, message: "Vui lòng chọn người vào phả hệ" },
            ]}
          >
            <Select
              allowClear
              loading={isLoadingUser}
              variant="filled"
              options={
                users?.items?.map((user: any) => ({
                  key: user.id,
                  value: user.id,
                  label: user.fullname,
                })) || []
              }
              disabled={isEdit}
            />
          </Form.Item>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 12,
            }}
          >
            <Form.Item
              name="father_id"
              label="Tên người cha/mẹ"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn người cha/mẹ vào phả hệ",
                },
              ]}
            >
              <Select
                allowClear
                loading={isLoadingUser}
                variant="filled"
                options={
                  users?.items?.map((user: any) => ({
                    key: user.id,
                    value: user.id,
                    label: user.fullname,
                  })) || []
                }
                disabled={isEdit}
              />
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
              name="marriage_status"
              label="Tình trạng hôn nhân"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn tình trạng hôn nhân",
                },
              ]}
            >
              <Select options={STATUS_MARRIE_OPTIONS} />
            </Form.Item>

            {currentMarriedStatus === "MARRIED" && (
              <Form.Item
                name="marriage_date"
                label="Ngày kết hôn"
                rules={[{ required: false }]}
              >
                <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
              </Form.Item>
            )}
            {currentMarriedStatus === "DIVORCED" && (
              <Form.Item
                name="divorce_date"
                label="Ngày ly hôn"
                rules={[{ required: false }]}
              >
                <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
              </Form.Item>
            )}
            {currentMarriedStatus === "DIVORCED" ||
              (currentMarriedStatus === "MARRIED" && (
                <Form.Item
                  name="father_id"
                  label="Tên người đã kết hôn"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn người vào phả hệ",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    loading={isLoadingUser}
                    variant="filled"
                    options={
                      users?.items?.map((user: any) => ({
                        key: user.id,
                        value: user.id,
                        label: user.fullname,
                      })) || []
                    }
                    disabled={isEdit}
                  />
                </Form.Item>
              ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 12,
            }}
          ></div>
        </Form>
      </Spin>
    </Modal>
  );
}
