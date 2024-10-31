import React, { useState, useEffect } from "react";
import { Table, Button, Tag, Avatar } from "antd";
import { fetchTeachers } from "../services/teacherService";

const TeacherList = ({ refreshTeachers, onAddTeacher }) => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTeachers = async () => {
    setLoading(true);
    try {
      const data = await fetchTeachers(1, 10);
      setTeachers(data);
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  // moi khi refreshTeachers dc goi thi se tra lai danh sach moi
  useEffect(() => {
    getTeachers();
  }, [refreshTeachers]);

  // from gpt
  const columns = [
    { title: "Mã", dataIndex: "code", key: "code" },
    {
      title: "Giáo viên",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={record.userId?.avatarUrl || "https://via.placeholder.com/50"}
          />
          <div style={{ marginLeft: 10 }}>
            <div>{record.userId?.name}</div>
            <div>{record.userId?.email}</div>
            <div>{record.userId?.phoneNumber}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Trình độ (cao nhất)",
      dataIndex: "degrees",
      key: "degree",
      render: (degrees) => {
        if (degrees && degrees.length > 0) {
          const degree = degrees[0];
          return (
            <div>
              <div>Bậc: {degree.type}</div>
              <div>Chuyên ngành: {degree.major}</div>
            </div>
          );
        }
        return "N/A";
      },
    },
    {
      title: "Bộ môn",
      dataIndex: "teacherPositionsId",
      key: "position",
      render: (positions) =>
        positions && positions.length > 0 ? positions[0].name : "N/A",
    },
    {
      title: "Địa chỉ",
      dataIndex: "userId",
      key: "address",
      render: (user) => user?.address || "N/A",
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (text, record) => (
        <Tag color={record.isActive ? "green" : "red"}>
          {record.isActive ? "Đang công tác" : "Ngưng"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: () => <Button>Chi tiết</Button>,
    },
  ];

  return (
    <>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={onAddTeacher}
      >
        Thêm
      </Button>
      <Table
        columns={columns}
        dataSource={teachers}
        rowKey={(record) => record._id}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default TeacherList;
