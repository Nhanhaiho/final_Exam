import React, { useState, useEffect } from "react";
import { Table, Tag, Button } from "antd";
import { fetchPositions } from "../services/teacherService";

const PositionList = ({ onAddPosition }) => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPositions = async () => {
      try {
        // goi ham ben service
        const data = await fetchPositions(); 
        // cap nhat lai state postition  bang data lay dc
        setPositions(data); 
      } catch (error) {
        console.error("Failed to fetch positions:", error);
      } finally {
        setLoading(false); 
      }
    };

    getPositions();
  }, []);

  // em tham khao chat gpt de co the render ra tu service lay dc
  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "_id",
      render: (text, record, index) => index + 1,
    },
    { title: "Mã", dataIndex: "code", key: "code" },
    { title: "Tên", dataIndex: "name", key: "name" },
    {
      title: "Trạng thái",
      key: "status",
      render: (text, record) => (
        <Tag color={record.isActive ? "green" : "red"}>
          {record.isActive ? "Hoạt động" : "Ngưng"}
        </Tag>
      ),
    },
    { title: "Mô tả", dataIndex: "des", key: "description" },
  ];

  return (
    <>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={onAddPosition}
      >
        Tạo mới
      </Button>
      <Table
        columns={columns}
        dataSource={positions}
        rowKey={(record) => record._id}
        loading={loading}
      />
    </>
  );
};

export default PositionList;

// test github