// src/api/weddingApi.js
import axios from "axios";

<<<<<<< HEAD
const API_BASE = "http://localhost:8081/boot/api/schedule";
=======
const API_BASE = "http://192.168.219.50:8081/boot/api/schedule";
>>>>>>> origin/JSG3

// ✅ 1. 결혼식 날짜 조회
export const getWeddingDate = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    console.error("❗ 토큰이 없습니다. 로그인 후 다시 시도하세요.");
    return;
  }

  try {
    const res = await axios.get(`${API_BASE}/wedding`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log("❗ token:", token);

    if (err.response?.status === 404) {
      console.log("✅ 결혼식 일정 없음, 팝업 띄우세요");
      return null;
    }

    console.error("❗ 오류 발생:", err);
    throw err;
  }
};

// ✅ 2. 결혼식 날짜 저장
export const saveWeddingDate = async (weddingDate) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    console.error("❗ 토큰이 없습니다. 로그인 후 다시 시도하세요.");
    return;
  }

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
    return res.data;
  } catch (err) {
    console.log("❗ token:", token);

    if (err.response?.status === 404) {
      console.log("✅ 결혼식 일정 없음, 팝업 띄우세요");
      return null;
    }

    console.error("❗ 오류 발생:", err);
    throw err;
  }
};

// ✅ 3. 일반 일정 생성
export const createSchedule = async (event) => {
  console.log("🐞 createSchedule 전달받은 event:", event); // 🔥 여기에 null이면 프론트 문제!

  const token = sessionStorage.getItem("token");
  if (!token) {
    console.error("❗ 토큰이 없습니다. 로그인 후 다시 시도하세요.");
    return;
  }

  try {
    const res = await axios.post(
      `${API_BASE}/event`,
      {
        scheduleDate: event.scheduleDate,
        scheTitle: event.scheTitle,
        scheCategory: event.scheCategory,
        scheStatus: event.scheStatus,
        
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("🐞 createSchedule API 응답:", res.data);  // API 응답 로그 추가  
    return res.data;
  } catch (err) {
    console.error("❗ 일정 생성 실패:", err);
    throw err;
  }
};



export const updateSchedule = async (scheIdx, payload) => {
  console.log("🛠 수정 요청 scheIdx:", scheIdx); // ← 이거 추가
  console.log("🛠 수정 요청 payload:", payload); // 수정 요청 payload 확인
  const token = sessionStorage.getItem("token");
  const res = await axios.put(
<<<<<<< HEAD
    `http://localhost:8081/boot/api/schedule/event/${scheIdx}`,
=======
    `http://192.168.219.50:8081/boot/api/schedule/event/${scheIdx}`,
>>>>>>> origin/JSG3
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};


// 유저의 모든 일정 가져오기
<<<<<<< HEAD


// 개인 일정만 불러오는 API
export const getUserSchedules = async () => {
  const token = sessionStorage.getItem("token");

  const res = await axios.get("http://localhost:8081/boot/api/schedule/events", {
=======
export const getUserSchedules = async () => {
  const token = sessionStorage.getItem("token");

  const res = await axios.get(`${API_BASE}/events`, {
>>>>>>> origin/JSG3
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data; // 일정 데이터 반환
};



<<<<<<< HEAD
=======

>>>>>>> origin/JSG3
// ✅ 일정 삭제
export const deleteSchedule = async (scheIdx) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    console.error("❗ 토큰이 없습니다. 로그인 후 다시 시도하세요.");
    return;
  }

  try {
    const res = await axios.delete(
<<<<<<< HEAD
      `http://localhost:8081/boot/api/schedule/event/${scheIdx}`,
=======
      `http://192.168.219.50:8081/boot/api/schedule/event/${scheIdx}`,
>>>>>>> origin/JSG3
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("❌ 일정 삭제 실패:", err);
    throw err;
  }
};




<<<<<<< HEAD
//템플릿저장하는 api
export const saveWeddingTemplate = async (payload) => {
  const token = sessionStorage.getItem("token");
  return axios.post("http://localhost:8081/boot/api/schedule/weddingTemplate", payload, {
=======
// WeddingApi.js
export const saveWeddingTemplate = async (payload) => {
  const token = sessionStorage.getItem("token");
  return axios.post("http://192.168.219.50:8081/boot/api/schedule/weddingTemplate", payload, {
>>>>>>> origin/JSG3
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
<<<<<<< HEAD


//템플릿일정가져오는 api


export const getWeddingTemplates = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get("http://localhost:8081/boot/api/schedule/weddingTemplate", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const checkIfTemplateExists = async () => {
  const token = sessionStorage.getItem("token");
 
  const res = await fetch("http://localhost:8081/boot/api/schedule/events/template/exist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("📡 템플릿 존재 확인 응답:", res.status);
  if (!res.ok) throw new Error("템플릿 존재 여부 확인 실패");
  return await res.json(); // true or false
};
=======
>>>>>>> origin/JSG3
