import React from "react";
import Header from "../Header";
import { Outlet, useNavigate } from "react-router-dom";
import "../styles/Setting.css";
import Member from "./Member"
import Footer from "../Footer"
import Setting from "./Setting"
const SettingLayout = () => {
  const navigate = useNavigate();

  const goToMember = () => navigate("/setting/member");
  const goToSetting = () => navigate("/setting");

  const handleLogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      sessionStorage.removeItem("token"); // ✅ 이걸로 토큰 제거해야 함!
      navigate("/mainpage");
    }
  };
  

  const handleDeleteAccount = async () => {
    if (!window.confirm("정말 회원 탈퇴하시겠습니까?")) return;
  
    const token = sessionStorage.getItem("token");
  
    try {
      const res = await fetch("http://localhost:8081/boot/api/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (res.ok) {
        alert("회원 탈퇴가 완료되었습니다.");
        sessionStorage.removeItem("token"); // ✅ 토큰 제거
        navigate("/mainpage");
      } else {
        alert("탈퇴 실패");
      }
    } catch (err) {
      //console.error(err);
      alert("서버 오류");
    }
  };

  return (
    <div>
      <Header />
      <div className="container-wrapper">
        {/* 왼쪽 메뉴 영역 */}
        <div className="left-container">
          <button className="btn1" onClick={goToMember}>회원정보</button>
          <br />
          <button className="btn1" onClick={goToSetting}>설정</button>
          <br /><br /><br /><br />
          <button className="btn2" onClick={handleLogout}>로그아웃 하기</button>
          <br />
          <button className="btn2" onClick={handleDeleteAccount}>회원탈퇴</button>
        </div>

        {/* 오른쪽 콘텐츠 영역 */}
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default SettingLayout;
