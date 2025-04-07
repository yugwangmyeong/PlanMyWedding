import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Setting.css";
import Header from "../Header";

const Setting = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      console.log("현재 저장된 토큰:", token);
    }
  }, [navigate]);

 

  const handleLogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      sessionStorage.removeItem("token");
      navigate("/mainpage");
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("정말 회원 탈퇴하시겠습니까?")) return;

    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("http://localhost:8081/boot/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("회원 탈퇴가 완료되었습니다.");
        sessionStorage.removeItem("token");
        navigate("/mainpage");
      } else {
        const errorData = await response.text();
        alert(errorData);
      }
    } catch (error) {
      console.error("회원 탈퇴 중 오류:", error);
      alert("회원 탈퇴 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      
    
        {/* 오른쪽 콘텐츠 */}
        <div className="right-container">
          <div className="title">설정</div>
          <div className="sub-title" style={{ marginTop: "30px" }}>캘린더 설정</div>

          <div className="setting-section">
            <span className="setting-label">일주일 시작요일 선택</span>
            <div className="toggle-wrapper">
              <input type="checkbox" id="chk1" className="toggle-input" />
              <label htmlFor="chk1" className="toggle-label"></label>
            </div>
          </div>
        </div>
        </div>
  );
};

export default Setting;
