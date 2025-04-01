import React, { useState } from "react";
import './styles/signup.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // 이메일과 비밀번호 유효성 검사
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      setError("이름, 이메일, 비밀번호, 비밀번호 확인을 입력해주세요.");
      return;
    }

    // 비밀번호 일치 여부 확인
    if (password !== confirmPassword) {
        setError("비밀번호가 일치하지 않습니다.");
        return;
    }

    setError("");  // 에러 메시지 초기화

    try {
      const response = await fetch("http://localhost:8081/boot/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        // 로그인 성공
        console.log("회원가입 성공");
        navigate('/welcome');
        // 성공 후 처리 (예: 리디렉션)
      } else {
        // 회원가입 실패
        setError("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("회원가입 요청 오류:", error);
      setError("서버와의 연결에 실패했습니다.");
    }
  };
   
  return (
    <div className="signup-container">
      <div className="signup-box">        
        <form onSubmit={handleSignUp}>
         <div className="input-group">
          <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력해주세요"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">이메일(계정)</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="계정을 입력해주세요"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
            />
            </div>
          <div className="input-group">
            <label htmlFor="confirmPassword"></label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 한번 더 입력해주세요"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="signup-btn">회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
