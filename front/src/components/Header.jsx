import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Header.css";
import toggleMenuIcon from "./styles/assets/toggleMenu.png";

const Header = () => {
  //토큰사용하기위해서 토큰을 login했을때 백엔드에서 받아와서 저장함

  const token = sessionStorage.getItem("token");
  console.log("프론트 토큰 확인:", token); // ✅ 콘솔에서 실제 토큰 출력
  const isLoggedIn = !!token;
  //드롭다운
  const [isMypageOpen, setIsMypageOpen] = useState(false);
  const [isRecOpen, setIsRecOpen] = useState(false);
  const mypageRef = useRef(null);
  const recRef = useRef(null);

  //Navigate사용하려면 필요함
  const navigate = useNavigate();
  const toggleMypageMenu = () => {
    setIsMypageOpen(!isMypageOpen);
  };
  const toggleRecommendMenu = () => {
    setIsRecOpen(!isRecOpen);
  };

  // 드롭다운 포커스 풀리는거
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mypageRef.current && !mypageRef.current.contains(e.target)) {
        setIsMypageOpen(false);
      }

      if (recRef.current && !recRef.current.contains(e.target)) {
        setIsRecOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    <header className="main-header">
      <div
        className="logo"
        onClick={() => navigate("/mainpage")}
        style={{ cursor: "pointer" }}
      >
        Plan my wedding
      </div>

      <nav className="nav-links">
        {/* 마이페이지 버튼 - 클릭 시 드롭다운 표시 */}
        <div
          ref={mypageRef}
          className={`mypage-container ${isMypageOpen ? "open" : ""}`}
        >
          <button onClick={toggleMypageMenu} className="mypage-btn">
            마이페이지
            <img
              src={toggleMenuIcon}
              className="mypage-icon"
              alt="toggle menu"
            />
          </button>

          <div className="dropdown-menu">
            <Link to="/calender">일정관리</Link>
            <Link to="/moneycontrol">예산관리</Link>
          </div>
        </div>

        <div
          ref={recRef}
          className={`recommend-container ${isRecOpen ? "open" : ""}`}
        >
          <button onClick={toggleRecommendMenu} className="mypage-btn">
            추천페이지
            <img
              src={toggleMenuIcon}
              className="mypage-icon"
              alt="toggle menu"
            />
          </button>
          <div className="dropdown-menu">
            <Link to="/recwedding">웨딩홀</Link>
          </div>
        </div>
        <div className="mypage-btn">
        <Link to="/Community" >
          커뮤니티
        </Link>
        </div>
        
      </nav>

      <nav className="nav-links2">
        {isLoggedIn ? (
          <>
            <span className="nickname">{username} 님</span>
            <Link to="/setting">
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
