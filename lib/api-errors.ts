export interface ApiErrorBody {
  message?: string;
  errorCode?: string;
  statusCode?: number;
}

export class ApiError extends Error {
  status: number;
  errorCode?: string;

  constructor(status: number, message: string, errorCode?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errorCode = errorCode;
  }
}

const ERROR_MESSAGES: Record<string, string> = {
  CANNOT_ATTACH_TO_SELF: "Không thể chọn bản thân làm cha mẹ.",
  HAS_CHILDREN: "Không thể xóa vì đang có nút con trên cây gia phả.",
  MEMBERS_WITHOUT_PARENT: "Thứ tự sinh không hợp lệ cho nút không có cha mẹ.",
  DUPLICATE_MEMBER_ORDER: "Thứ tự sinh bị trùng với anh/chị/em ruột.",
  PARENT_USER_NOT_FOUND: "Người cha được chọn không tồn tại.",
  PARENT_NODE_NOT_FOUND: "Người cha chưa được khởi tạo trên cây gia phả.",
  NODE_NOT_FOUND: "Không tìm thấy node.",
  TREE_ROOT_NOT_FOUND: "Hệ thống chưa có node gốc.",
  USER_ALREADY_HAS_NODE: "Người dùng đã được gán vào cây gia phả.",
  PARENT_ALREADY_HAS_CHILD: "Người cha đã có con kế vị trực tiếp.",
};

export function resolveApiErrorMessage(body: ApiErrorBody, fallback: string): string {
  if (body.errorCode && ERROR_MESSAGES[body.errorCode]) {
    return ERROR_MESSAGES[body.errorCode];
  }
  return body.message ?? fallback;
}
