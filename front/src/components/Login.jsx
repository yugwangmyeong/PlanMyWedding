import React, { useState } from "react";
import "./styles/login.css";
import { useNavigate } from "react-router-dom";
const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보기 상태 추가
  const [error, setError] = useState("");

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
        sessionStorage.setItem("token", data.token);
        window.location.href = "/mainpage"; //  리다이렉트로 새로고침하고 보냄
        // ✅ 콘솔에 토큰 출력
        console.log("받은 토큰:", data.token); //  고침을 하기전에 보여주기는하는데 새로고침후에 바로 콘솔에서는 보이지않음
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
        <div className="number-box">
          <span>31</span>
        </div>
        <form onSubmit={handleLogin}>
          {/* 이메일 입력 필드 */}
          <div className="input-group">
            <label htmlFor="email">계정</label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="계정을 입력해주세요"
                style={{ paddingLeft: "30px", width: "calc(100% - 65px)" }}
              />
              <img
                src="/images/account.jpg"
                alt="계정 아이콘"
                style={{
                  position: "absolute",
                  left: "40px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "20px",
                  height: "20px",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"} // 비밀번호 보기 상태에 따라 타입 변경
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
                style={{ paddingLeft: "30px", width: "calc(100% - 65px)" }}
              />
              <img
                src="/images/pw.jpg"
                alt="비밀번호 아이콘"
                style={{
                  position: "absolute",
                  left: "40px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "20px",
                  height: "20px",
                  pointerEvents: "none",
                }}
              />
              <img
                src={
                  showPassword ? "/images/openeye.png" : "/images/closeeye.png"
                } // 상태에 따라 아이콘 변경
                alt="비밀번호 보기 아이콘"
                style={{
                  position: "absolute",
                  right: "45px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "13px",
                  height: "13px",
                  pointerEvents: "pointer",
                }}
                onClick={() => setShowPassword(!showPassword)} // 클릭하면 두 칸 다 상태 변경
              />
            </div>
          </div>

          {/* 로그인 버튼 */}
          <button type="submit" className="login-btn">
            로그인
          </button>

          {/* 에러 메시지 표시 */}
          {error && <p className="error-message">{error}</p>}

          {/* 회원가입 / 아이디 찾기 / 비밀번호 찾기 */}
          <div className="login-options">
            <a href="/register" className="option-item">
              회원가입
            </a>
            <span className="dividerLogin"></span>
            <a href="/find-id" className="option-item">
              아이디 찾기
            </a>
            <span className="dividerLogin"></span>
            <a href="/find-password" className="option-item">
              비밀번호 찾기
            </a>
          </div>

          {/* "OR"을 포함한 구분선 */}
          <div className="or-divider">
            <div className="line"></div>
            <span>OR</span>
            <div className="line"></div>
          </div>

          {/* 카카오 로그인 버튼 */}
          <button className="kakao-login">
            <img src="/images/kakao.png" alt="카카오톡 로그인" />
            <span>카카오톡 로그인</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
