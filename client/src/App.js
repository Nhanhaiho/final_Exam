import React, { useState } from "react";
import { Layout, Menu, Drawer } from "antd";
import TeacherList from "./components/TeacherList";
import TeacherForm from "./components/TeacherForm";
import PositionList from "./components/PositionList";
import PositionForm from "./components/PositionForm";

const { Content } = Layout;

function App() {
  const [isTeacherFormVisible, setTeacherFormVisible] = useState(false);
  const [isPositionFormVisible, setPositionFormVisible] = useState(false);
  const [refreshTeachers, setRefreshTeachers] = useState(false);

  const showTeacherForm = () => setTeacherFormVisible(true);
  const closeTeacherForm = () => setTeacherFormVisible(false);
  const showPositionForm = () => setPositionFormVisible(true);
  const closePositionForm = () => setPositionFormVisible(false);

  // khi gv dc them vao se goi lai ham nay
  const handleTeacherAdded = () => {
    setRefreshTeachers(!refreshTeachers); // Thay đổi giá trị để kích hoạt re-render
    // them thanh cong se dong form
    closeTeacherForm();
  };

  return (
    <Layout>
      <Content style={{ padding: "70px" }}>
        <TeacherList
          refreshTeachers={refreshTeachers}
          onAddTeacher={showTeacherForm}
        />
        <PositionList onAddPosition={showPositionForm} />

        {/* Drawer cho form gv */}
        <Drawer
          title="Tạo thông tin giáo viên"
          width={720}
          onClose={closeTeacherForm}
          visible={isTeacherFormVisible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <TeacherForm onSuccess={handleTeacherAdded} />
        </Drawer>

        {/* Drawer cho form vitri */}
        {/* drawer nay se xuat hien tu ben phai sang */}
        <Drawer
          title="Vị trí công tác"
          width={500}
          onClose={closePositionForm}
          visible={isPositionFormVisible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <PositionForm />
        </Drawer>
      </Content>
    </Layout>
  );
}

export default App;

// test2
