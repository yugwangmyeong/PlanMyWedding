import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./styles/Header.css";
import toggleMenuIcon from "./styles/assets/toggleMenu.png";

const Header = () => {

  //토큰사용하기위해서 토큰을 login했을때 백엔드에서 받아와서 저장함
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const [isMypageOpen, setIsMypageOpen] = useState(false);

  //Navigate사용하려면 필요함
  const navigate = useNavigate();
  const toggleMypageMenu = () => {
    setIsMypageOpen(!isMypageOpen);
  };

  // ✅ 토큰에서 username 꺼내는 함수
  const getUsernameFromToken = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join("")
      );
      const payload = JSON.parse(jsonPayload);
      return payload.username || "username";
    } catch {
      return "username";
    }
  };

  const username = isLoggedIn ? getUsernameFromToken(token) : null;




  
  return (
    <header className="header">
      <div className="logo" onClick={()=>navigate("/mainpage")}
        style={{cursor:"pointer"}}>
          Plan my wedding
        </div>

      <nav className="nav-links">
        {/* 마이페이지 버튼 - 클릭 시 드롭다운 표시 */}
        <div className={`mypage-container ${isMypageOpen ? "open" : ""}`}>
          <button onClick={toggleMypageMenu} className="mypage-btn">
            마이페이지
            <img src={toggleMenuIcon} className="mypage-icon" />
          </button>
          <div className="mypage-dropdown">
            <Link to="/schedule">일정관리</Link>
            <Link to="/moneycontrol">예산관리</Link>
          </div>
        </div>
        <Link to="/Community" className="mypage-container">
          커뮤니티
        </Link>
      </nav>

      <nav className="nav-links2">
        {isLoggedIn ? (
          <>
            <span className="nickname">{username} 님</span>
            <Link to="/Update">
              <span className="material-symbols-outlined">account_circle</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/Login" className="login-link">
              로그인
            </Link>
            <span className="header-margin">/ </span>
            <Link to="/Register" className="reg-link">
              회원가입
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
