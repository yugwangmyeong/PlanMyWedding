import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Member.css";

const Member = () => {
  const [userInfo, setUserInfo] = useState({ email: "", username: "" });
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  // 🟡 사용자 정보 불러오기
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    fetch("http://localhost:8081/boot/api/member", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo({ email: data.email, username: data.username });
      });
  }, [navigate]);

  // 🟡 회원정보 수정 요청
  const handleUpdate = async () => {
    if (newPassword !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8081/boot/api/member", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: newPassword,
      }),
    });

    if (response.ok) {
      alert("회원 정보가 수정되었습니다.");
      navigate("/setting");
    } else {
      alert("수정 실패");
    }
  };

  return (
    <div className="right-container">
      <div className="title">회원정보 변경</div>
      <br />
      <br />

      {/* 입력 필드들 */}
      <div className="form-group-row">
        <label>이메일</label>
        <input type="email" value={userInfo.email} disabled />
      </div>

      <div className="form-group-row">
        <label>닉네임</label>
        <input
          type="text"
          placeholder="사용할 닉네임 입력"
          value={userInfo.username || ""}
          onChange={(e) =>
            setUserInfo({ ...userInfo, username: e.target.value })
          }
        />
      </div>

      <div className="form-group-row">
        <label>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className="form-group-row">
        <label>비밀번호 확인</label>
        <input
          type="password"
          placeholder="비밀번호 다시 입력"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </div>

      <div className="button-wrapper">
        <button className="submit-btn" onClick={handleUpdate}>
          수정하기
        </button>
      </div>
    </div>
  );
};

export default Member;
