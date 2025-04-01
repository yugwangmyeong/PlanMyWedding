import React, { useState } from "react";
import './styles/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // 이메일과 비밀번호 유효성 검사
    if (email === "" || password === "") {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setError("");  // 에러 메시지 초기화

    try {
      const response = await fetch("http://localhost:8081/boot/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // 로그인 성공
        console.log("로그인 성공");
        navigate('/header');
        // 성공 후 처리 (예: 리디렉션)
      } else {
        // 로그인 실패
        setError("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("로그인 요청 오류:", error);
      setError("서버와의 연결에 실패했습니다.");
    }
  };
   
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>로그인</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">계정</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">로그인</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
