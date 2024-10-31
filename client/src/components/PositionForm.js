import React from "react";
import { Form, Input, Button, Select, message } from "antd";
import axios from "axios";

const { Option } = Select;

const PositionForm = () => {
  // dung axios ket noi vs backend
  const onFinish = async (values) => {
    try {
      await axios.post("http://localhost:5000/teacher-positions", values);
      message.success("thêm thành công");
    } catch (error) {
      message.error("ko thể thêm ");
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Mã"
        name="code"
        rules={[{ required: true, message: "Vui lòng nhập mã!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Tên"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Mô tả" name="description">
        <Input />
      </Form.Item>
      <Form.Item label="Trạng thái" name="status">
        <Select defaultValue="Hoạt động">
          <Option value="Hoạt động">Hoạt động</Option>
          <Option value="Ngưng">Ngưng</Option>
        </Select>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Save
      </Button>
    </Form>
  );
};

export default PositionForm;
// hello
