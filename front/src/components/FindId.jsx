import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/login.css"; // login.css 재사용

const FindId = () => {
  const [nickname, setNickname] = useState("");
  const [foundEmail, setFoundEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFindId = async (e) => {
    e.preventDefault();

    if (nickname.trim() === "") {
      setError("닉네임을 입력해주세요.");
      return;
    }
    setError("");
    try {
      // 닉네임을 쿼리 파라미터로 전달하여 API 호출
      const response = await fetch(
        `http://localhost:8081/boot/api/user/find-id?username=${encodeURIComponent(
          nickname
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
        setFoundEmail(data.email);
      } else {
        setError("해당 닉네임으로 등록된 계정을 찾을 수 없습니다.");
        setFoundEmail("");
      }
    } catch (err) {
      //console.error("아이디 찾기 요청 오류:", err);
      setError("서버와의 연결에 실패했습니다.");
      setFoundEmail("");
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
        <h2>아이디 찾기</h2>
        <form onSubmit={handleFindId}>
          <div className="input-group">
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력해주세요"
            />
          </div>
          <button type="submit" className="login-btn">
            아이디 찾기
          </button>
          {error && <p className="error-message">{error}</p>}
          {foundEmail && (
            <div className="result">
              <p>찾은 아이디: {foundEmail}</p>
            </div>
          )}
        </form>
        <div className="login-options">
          <a href="/login" className="option-item">
            로그인
          </a>
          <span className="dividerLogin"></span>
          <a href="/find-password" className="option-item">
            비밀번호 찾기
          </a>
        </div>
      </div>
    </div>
  );
};

export default FindId;
