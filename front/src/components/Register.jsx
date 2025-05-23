import React, { useState } from "react";
import "./styles/register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 & 확인칸 같이 보이기 상태
  const navigate = useNavigate();

  
  const handleSignUp = async (e) => {
    e.preventDefault();

    let missingFields = [];

    if (name === "") missingFields.push("이름");
    if (email === "") missingFields.push("이메일(계정)");
    if (password === "") missingFields.push("비밀번호");
    if (confirmPassword === "") missingFields.push("비밀번호 확인");

    if (missingFields.length > 0) {
      setError(`${missingFields.join(", ")}을(를) 입력해주세요.`);
      return;
    }

    // 비밀번호 일치 여부 확인
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setError(""); // 에러 메시지 초기화

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
        //console.log("회원가입 성공");
        
        navigate("/login");
        // 성공 후 처리 (예: 리디렉션)
      } else {
        // 회원가입 실패
        /*console.log("회원가입 요청 데이터:", {
          name,
          email,
          password,
        });*/
        setError("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      
      //console.error("회원가입 요청 오류:", error);
      setError("서버와의 연결에 실패했습니다.");
    }
  };

  return (
    <div
      className="register-container"
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
      <div className="register-box">
        <div className="number-box">
          <span>31</span>
        </div>
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <label htmlFor="name">닉네임</label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력해주세요"
                style={{ paddingLeft: "30px", width: "calc(100% - 65px)" }}
              />
              <img
                src="/images/name.jpg"
                alt="이름 아이콘"
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

          <div className="input-group">
            <label htmlFor="email">이메일(계정)</label>
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

          {/* 비밀번호 입력칸 */}
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"} // 한 개의 상태로 관리
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

          {/* 비밀번호 확인 입력칸 */}
          <div className="input-group">
            <label htmlFor="confirmPassword"></label>
            <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}  // 비밀번호 입력칸과 동일한 상태 사용
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 한번 더 입력해주세요"
              style={{ paddingLeft: '30px', width: 'calc(100% - 65px)'}}
            />
            <img
            src="/images/pw.jpg"
            alt="비밀번호 아이콘"
            style={{
              position: 'absolute',
              left: '40px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              pointerEvents: 'none',
              }}         
              />
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="register-btn">회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
