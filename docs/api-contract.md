# API Contract - Family Tree System

Base URL

/api/v1

# Authentication

# Login

POST /auth/login

Request

{
"email": "user@example.com",
"password": "secret"
}

Response

{
"accessToken": "jwt-token",
"refreshToken": "refresh-token"
}

# Family APIs

# Create Family

POST /families

Request

{
"name": "Gia tộc Nguyễn Văn",
"description": "Dòng họ Nguyễn Văn tại quê hương Hà Nội"
}

Response

{
"id": "family-uuid-1111",
"name": "Gia tộc Nguyễn Văn",
"description": "Dòng họ Nguyễn Văn tại quê hương Hà Nội",
"createdAt": "2026-06-20T09:00:00.000Z"
}

# Get Family

GET /families/{id}

Response

{
"id": "family-uuid-1111",
"name": "Gia tộc Nguyễn Văn",
"description": "Dòng họ Nguyễn Văn tại quê hương Hà Nội",
"createdAt": "2026-06-20T09:00:00.000Z"
}

# Update Family

PATCH /families/{id}

Request

{
"name": "Gia tộc Nguyễn Văn - Chi Trưởng",
"description": "Cập nhật mô tả dòng họ chi Trưởng"
}

Response

{
"id": "family-uuid-1111",
"name": "Gia tộc Nguyễn Văn - Chi Trưởng",
"description": "Cập nhật mô tả dòng họ chi Trưởng",
"updatedAt": "2026-06-20T09:30:00.000Z"
}

# Person APIs

# Create Person

POST /persons

Request

{
"familyId": "family-uuid-1111",
"firstName": "Nguyen",
"lastName": "Duong",
"gender": "MALE",
"birthDate": "1999-10-30"
}

Response

{
"id": "u3333333-3333-3333-3333-333333333333",
"familyId": "family-uuid-1111",
"firstName": "Nguyen",
"lastName": "Duong",
"gender": "MALE",
"birthDate": "1999-10-30",
"createdAt": "2026-06-20T09:35:00.000Z"
}

# Get Person

GET /persons/{id}

Response

{
"id": "u3333333-3333-3333-3333-333333333333",
"familyId": "family-uuid-1111",
"firstName": "Nguyen",
"lastName": "Duong",
"gender": "MALE",
"birthDate": "1999-10-30",
"otherName": "Duong Nguyen",
"yearOfDeath": null,
"burialPlace": null,
"address": "Ha Noi",
"biography": null,
"status": "ALIVE",
"email": "duong@example.com",
"isActive": true
}

# Update Person

PATCH /persons/{id}

Request

{
"firstName": "Nguyen Minh",
"lastName": "Duong",
"address": "TP. Ho Chi Minh"
}

Response

{
"id": "u3333333-3333-3333-3333-333333333333",
"firstName": "Nguyen Minh",
"lastName": "Duong",
"address": "TP. Ho Chi Minh",
"updatedAt": "2026-06-20T09:40:00.000Z"
}

# Search Person

GET /persons?q=duong&page=1&limit=20

Response

{
"records": [
{
"id": "u3333333-3333-3333-3333-333333333333",
"fullName": "Nguyen Minh Duong",
"gender": "MALE",
"birthDate": "1999-10-30",
"familyId": "family-uuid-1111"
}
],
"total": 1
}

Family Tree (Node) APIs

# Get Tree Layout

GET /nodes/tree

Response

{
"id": "e2c349a0-128b-4c07-9bb3-50012bc0ae31",
"userId": "u1111111-1111-1111-1111-111111111111",
"parentId": null,
"createdAt": "2026-06-20T09:40:00.000Z",
"createdBy": "Admin",
"updatedAt": "2026-06-20T09:40:00.000Z",
"updatedBy": null,
"isActive": true,
"members": 2,
"user": {
"id": "u1111111-1111-1111-1111-111111111111",
"fullname": "Nguyễn Văn Tổ",
"otherName": "Cụ Tổ",
"gender": "MALE",
"yearOfBirth": 1900,
"yearOfDeath": 1980,
"burialPlace": "Nghĩa trang Quê Nhà",
"address": "Hà Nội, Việt Nam",
"biography": "Người sáng lập dòng họ Nguyễn Văn.",
"status": "DECEASED",
"email": "cuto@nguyen.org",
"isActive": true,
"createdAt": "2026-06-20T09:00:00.000Z",
"updatedBy": "Admin"
},
"children": [
{
"id": "f5d450b1-239c-5d18-0cc4-61123cd1bf42",
"userId": "u2222222-2222-2222-2222-222222222222",
"parentId": "e2c349a0-128b-4c07-9bb3-50012bc0ae31",
"createdAt": "2026-06-20T09:45:00.000Z",
"createdBy": "Admin",
"updatedAt": "2026-06-20T09:45:00.000Z",
"updatedBy": null,
"isActive": true,
"members": 1,
"user": {
"id": "u2222222-2222-2222-2222-222222222222",
"fullname": "Nguyễn Văn Cả",
"otherName": "Bác Cả",
"gender": "MALE",
"yearOfBirth": 1930,
"yearOfDeath": 2010,
"burialPlace": "Nghĩa trang Quê Nhà",
"address": "Hà Nội, Việt Nam",
"biography": "Trưởng nam đời thứ hai.",
"status": "DECEASED",
"email": "bacca@nguyen.org",
"isActive": true,
"createdAt": "2026-06-20T09:10:00.000Z",
"updatedBy": "Admin"
},
"children": []
}
]
}

# Attach Member to Tree

POST /nodes/attach

Request

{
"newUserId": "u3333333-3333-3333-3333-333333333333",
"parentUserId": "u2222222-2222-2222-2222-222222222222"
}

Response

{
"nodeId": "c7b889d1-998a-4d22-8cc2-90111bc2ae99",
"coupleId": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
"level": 3,
"parentNodeId": "f5d450b1-239c-5d18-0cc4-61123cd1bf42",
"parentUserId": "u2222222-2222-2222-2222-222222222222"
}

# Get Paginated Nodes

GET /nodes

Response

{
"records": [
{
"nodeId": "e2c349a0-128b-4c07-9bb3-50012bc0ae31",
"userId": "u1111111-1111-1111-1111-111111111111",
"parentId": null,
"createdAt": "2026-06-20T09:40:00.000Z",
"createdBy": "Admin",
"updatedAt": "2026-06-20T09:40:00.000Z",
"updatedBy": null,
"isActive": true,
"members": 2,
"parent": null,
"user": {
"id": "u1111111-1111-1111-1111-111111111111",
"fullname": "Nguyễn Văn Tổ",
"isActive": true
},
"couples": [
{
"id": "cp999999-9999-9999-9999-999999999999",
"level": 1,
"userId": "spouse-uuid-here",
"isActive": true,
"nodeId": "e2c349a0-128b-4c07-9bb3-50012bc0ae31",
"user": {
"id": "spouse-uuid-here",
"fullname": "Trần Thị Tổ",
"gender": "FEMALE",
"isActive": true
}
}
]
}
],
"totalRecords": 1
}

# Get Node Detail

GET /nodes/{id}

Response

{
"nodeId": "e2c349a0-128b-4c07-9bb3-50012bc0ae31",
"userId": "u1111111-1111-1111-1111-111111111111",
"parentId": null,
"createdAt": "2026-06-20T09:40:00.000Z",
"createdBy": "Admin",
"updatedAt": "2026-06-20T09:40:00.000Z",
"isActive": true,
"members": 1,
"user": {
"id": "u1111111-1111-1111-1111-111111111111",
"fullname": "Nguyễn Văn Tổ",
"gender": "MALE",
"isActive": true
},
"couples": [
{
"id": "couple-uuid-1234",
"level": 1,
"userId": "spouse-uuid-here",
"isActive": true,
"nodeId": "e2c349a0-128b-4c07-9bb3-50012bc0ae31",
"user": {
"id": "spouse-uuid-here",
"fullname": "Trần Thị Tổ",
"gender": "FEMALE",
"isActive": true
}
}
]
}

# Create Node (Admin Tool)

POST /nodes

Request

{
"userId": "u4444444-4444-4444-4444-444444444444",
"parentId": "e2c349a0-128b-4c07-9bb3-50012bc0ae31",
"coupleUserId": "u5555555-5555-5555-5555-555555555555",
"members": 2,
"isActive": true
}

Update Node

PUT /nodes

Request

{
"id": "e2c349a0-128b-4c07-9bb3-50012bc0ae31",
"userId": "u1111111-1111-1111-1111-111111111111",
"parentId": "parent-node-uuid-if-change",
"members": 3,
"isActive": true
}

Response

{
"success": true,
"message": "Node updated successfully."
}

# Delete Node

DELETE /nodes/{id}

Response

{
"success": true,
"message": "Node removed successfully."
}

# Error Codes Handbook

HTTP Status

Mã Lỗi (Message/ErrorCode)

Ý nghĩa lỗi & Gợi ý xử lý cho Front-end

400

CANNOT_ATTACH_TO_SELF

Người dùng tự chọn bản thân làm cha mẹ. Hiển thị cảnh báo chặn.

400

HAS_CHILDREN

Không thể xóa nút này vì nó đang là cha của một hoặc nhiều nút khác. Yêu cầu xóa các nút con trước.

400

MEMBERS_WITHOUT_PARENT

Khai báo thứ tự sinh khác 1 cho một nút không có cha mẹ. Nút gốc luôn có thứ tự là 1.

400

DUPLICATE_MEMBER_ORDER

Thứ tự sinh bị trùng lặp với anh/chị/em ruột dưới cùng một cha mẹ.

404

PARENT_USER_NOT_FOUND

Người dùng cha được chọn không tồn tại trong hệ thống.

404

PARENT_NODE_NOT_FOUND

Người dùng cha hợp lệ nhưng chưa được khởi tạo vị trí trên cây gia phả.

404

NODE_NOT_FOUND

Node ID gửi lên trong tác vụ cập nhật hoặc xóa không tồn tại.

404

TREE_ROOT_NOT_FOUND

Hệ thống chưa tìm thấy Node gốc (không có parent_id) để dựng cây gia phả.

409

USER_ALREADY_HAS_NODE

Người dùng này đã được gán vào một vị trí khác trên cây gia phả rồi.

409

PARENT_ALREADY_HAS_CHILD

Người cha này đã có con kế vị trực tiếp rồi, không thể gán thêm con.
