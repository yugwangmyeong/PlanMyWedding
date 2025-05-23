import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/login.css"; // 로그인 페이지와 동일한 CSS 사용
import Footer from "./Footer";

const FindPassword = () => {
  const [email, setEmail] = useState("");
  const [foundPassword, setFoundPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFindPassword = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      setError("아이디(이메일)을 입력해주세요.");
      return;
    }
    setError("");
    try {
      // 아이디(이메일)를 쿼리 파라미터로 전달하여 API 호출
      const response = await fetch(
        `http://localhost:8081/boot/api/user/find-password?email=${encodeURIComponent(
          email
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFoundPassword(data.password);
      } else {
        setError("해당 아이디로 등록된 사용자를 찾을 수 없습니다.");
        setFoundPassword("");
      }
    } catch (err) {
      //console.error("비밀번호 찾기 요청 오류:", err);
      setError("서버와의 연결에 실패했습니다.");
      setFoundPassword("");
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="login-box">
        <h2>비밀번호 찾기</h2>
        <form onSubmit={handleFindPassword}>
          <div className="input-group">
            <label htmlFor="email">아이디(이메일)</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="아이디(이메일)을 입력해주세요"
            />
          </div>
          <button type="submit" className="login-btn">
            비밀번호 찾기
          </button>
          {error && <p className="error-message">{error}</p>}
          {foundPassword && (
            <div className="result">
              <p>찾은 비밀번호: {foundPassword}</p>
              <p>보안을 위해 즉시 비밀번호 변경을 권장드립니다.</p>
            </div>
          )}
        </form>
        <div className="login-options">
          <a href="/login" className="option-item">
            로그인
          </a>
          <span className="dividerLogin"></span>
          <a href="/find-id" className="option-item">
            아이디 찾기
          </a>
        </div>
      </div>
    </div>
  );
};

export default FindPassword;
