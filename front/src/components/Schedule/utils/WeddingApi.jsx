// src/api/weddingApi.js
import axios from "axios";

const API_BASE = "http://localhost:8081/boot/api/schedule";


const token = sessionStorage.getItem("token"); // ✅ 호출 시점에 정확히 가져옴


//2. weddingDate
export const getWeddingDate = async () => {
    try {
      const res = await axios.get(`${API_BASE}/wedding`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      console.log("❗ token:", token);
      if (err.response?.status === 204) return null;
      console.error("❗ 오류 발생:", err);
      throw err;
    }
  };
  

export const saveWeddingDate = async (weddingDate) => {
  
  try {
    const res = await axios.post(
      `${API_BASE}/wedding`,
      { weddingDate },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data; // 저장된 Schedule 객체
  } catch (err) {
    console.log("❗ token:", token);
    console.error("❗ 오류 발생:", err);
    throw err;
  }
};
