// src/components/TeacherForm.js
import React from "react";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import { createTeacher } from "../services/teacherService";

// tao mot dropdown menu, 
const { Option } = Select;

const TeacherForm = ({ onSuccess }) => {
  const onFinish = async (values) => {
    try {
    // test api tao gv moi
      await createTeacher(values);
      message.success("Giáo viên đã được thêm thành công");

      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi thêm giáo viên");
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Họ tên"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Ngày sinh"
        name="dob"
        rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Số điện thoại"
        name="phoneNumber"
        rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Vui lòng nhập email hợp lệ!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Địa chỉ" name="address">
        <Input />
      </Form.Item>
      <Form.Item label="Vị trí công tác" name="position">
        <Select>
          {/* 2 option */}
          <Option value="TTS">Thực tập sinh</Option>
          <Option value="GVBM">Giáo viên bộ môn</Option>
        </Select>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Lưu
      </Button>
    </Form>
  );
};

export default TeacherForm;
