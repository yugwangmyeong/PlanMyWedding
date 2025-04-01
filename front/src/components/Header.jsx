import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Header.css";
import toggleMenuIcon from "./styles/assets/toggleMenu.png";

const Header = () => {
  const [isMypageOpen, setIsMypageOpen] = useState(false);

  const toggleMypageMenu = () => {
    setIsMypageOpen(!isMypageOpen);
  };

  return (
    <header className="header">
      <div className="logo">Plan my wedding</div>

      <nav className="nav-links">
        {/* 마이페이지 버튼 - 클릭 시 드롭다운 표시 */}
        <div className={`mypage-container ${isMypageOpen ? "open" : ""}`}>
          <button onClick={toggleMypageMenu} className="mypage-btn">
            마이페이지 
            <img src={toggleMenuIcon}  className="mypage-icon" />
          </button>
          <div className="mypage-dropdown">
            <Link to="/schedule">일정관리</Link>
            <Link to="/moneycontrol">예산관리</Link>
          </div>
          </div>
        <Link to="/Community" className="header-margin">
          커뮤니티
        </Link>
      </nav>

      <nav className="nav-links2">
        <Link to="/Login" className="login-link">로그인</Link>
        <span className="header-margin">/ </span>
        <Link to="/Register" className="reg-link">회원가입</Link>
        <Link to="/Update" className="">
          <span className="material-symbols-outlined">account_circle</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
