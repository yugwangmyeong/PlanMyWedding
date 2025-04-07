import React, { useRef, useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import "./styles/Setting.css";

const Setting = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("정말 로그아웃 하시겠습니까?");
    if (confirmLogout) {
      localStorage.removeItem("token"); // 또는 세션 스토리지
      navigate("/mainpage"); // 메인 페이지로 이동
    }
  };
  
  // 회원탈퇴 핸들러
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("정말 회원 탈퇴하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      console.log("보내는 토큰:", token);
      const response = await fetch("http://localhost:8081/boot/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // JWT 사용하는 경우
        },
      });

      if (response.ok) {
        alert("회원 탈퇴가 완료되었습니다.");
        localStorage.removeItem("token");
        navigate("/mainpage");
      } else {
        const errorData = await response.text();
        alert(errorData);
      }
    } catch (error) {
      alert("회원 탈퇴 중 오류가 발생했습니다.");
      console.error(error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.log("토큰 없음!"); // ✅ 이거 먼저 확인
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      
      console.log("현재 저장된 토큰:", token); // ✅ 콘솔에 토큰 출력
    }
  }, []);
  
  return (
    <div>
      <Header />

      <div className="container-wrapper">
        {/* 왼쪽 박스 */}
        <div className="left-container">
          <button className="btn1">회원정보</button>
          <br></br>
          <button className="current-btn">설정</button>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <button className="btn2" onClick={handleLogout}>로그아웃 하기 </button>
          <br></br>
          <button className="btn2" onClick={handleDeleteAccount}>회원탈퇴</button>
        </div>

        {/* 오른쪽 박스 */}
        <div className="right-container">
          <div className="title">설정</div>
          <br></br>
          <br></br>

          <div className="sub-title">캘린더 설정</div>
          <br></br>
          <br></br>
          {/* 캘린더 설정 */}
          <div className="setting-section">
            <span className="setting-label">일주일 시작요일 선택</span>
            <div className="toggle-wrapper">
              <input type="checkbox" id="chk1" className="toggle-input" />
              <label htmlFor="chk1" className="toggle-label"></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;