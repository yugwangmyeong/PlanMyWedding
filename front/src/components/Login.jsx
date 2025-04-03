import React, { useState } from "react";
import "./styles/login.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
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

    setError(""); // 에러 메시지 초기화

    try {
      const response = await fetch("http://localhost:8081/boot/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        
        setToken(data.token);
        // ✅ 토큰 저장 (로그인 유지용)
        localStorage.setItem("token", data.token);
        
        window.location.href = "/header";     //  리다이렉트로 새로고침하고 보냄
        // ✅ 콘솔에 토큰 출력
        console.log("받은 토큰:", data.token);  //  고침을 하기전에 보여주기는하는데 새로고침후에 바로 콘솔에서는 보이지않음
        alert("받은 토큰: " + data.token); // 일시적으로 확인용
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
            <label htmlFor="email">이메일</label>
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
          <button type="submit" className="login-btn">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
