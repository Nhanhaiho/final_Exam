import axios from "axios";

const API_URL = "http://localhost:5000";

// lay danh sach gv
export const fetchTeachers = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/teachers`, {
      params: { page, limit },
    });
    // return ds gv
    return response.data.teachers; 
  } catch (error) {
    console.error("Failed to fetch teachers:", error);
    throw error;
  }
};

// lay ds vi tri congtac
export const fetchPositions = async () => {
  try {
    const response = await axios.get(`${API_URL}/teacher-positions`);
    // tra ds vi tri cong tac
    return response.data; 
  } catch (error) {
    console.error("Failed to fetch positions:", error);
    throw error;
  }
};

// e co thu ham nay nhung k chay dc
export const createTeacher = async (teacherData) => {
  try {
    const response = await axios.post(`${API_URL}/teachers`, teacherData);
    return response.data;
  } catch (error) {
    console.error("Failed to create teacher:", error);
    throw error;
  }
};