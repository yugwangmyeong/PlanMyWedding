import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:8081/boot/api", // spring 주소
=======
  baseURL: "http://192.168.219.50:8081/boot/api", // spring 주소
>>>>>>> origin/JSG3
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    console.log("🚀 API 호출 시작");
    console.log("🔗 URL:", config.url);
    console.log("📦 데이터:", config.data || config.params);
    console.log("🪪 토큰:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  

export default api;
