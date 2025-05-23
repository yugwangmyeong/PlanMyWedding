import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Member.css";
import CustomAlert from "../Customalert";
const Member = () => {
  const [userInfo, setUserInfo] = useState({ email: "", username: "" });
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [currentPassword, setCurrentPassword] = useState(""); // 현재 비번 확인용
  const [alertMessage, setAlertMessage] = useState(""); // ✅ 알림 메시지 상태
  const [showAlert, setShowAlert] = useState(false); // ✅ 알림창 표시 여부
  const navigate = useNavigate();

  // 🟡 사용자 정보 불러오기
  useEffect(() => {
    const token = sessionStorage.getItem("token"); // ✅ 수정
    if (!token) {
      //console.warn("❗ 토큰 없음! Authorization 헤더 누락됨");
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
      setAlertMessage("비밀번호가 일치하지 않습니다.");
      setShowAlert(true);
      return;
    }

    const token = sessionStorage.getItem("token");

    const response = await fetch("http://192.168.219.50:8081/boot/api/member", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: userInfo.username,
        currentPassword: currentPassword,
        newPassword: newPassword,
      }),
    });

    if (response.ok) {
      setAlertMessage("회원 정보가 수정되었습니다.");
      setShowAlert(true);
      //console.log("✅ 알림 열림");
      setTimeout(() => {
        setShowAlert(false);
        navigate("/setting"); // ✅ navigate는 알림 닫힌 뒤 이동
      }, 1000); // 1초 후 이동
    } else {
      setAlertMessage("수정 실패");
      setShowAlert(true);
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

      {/* 현재 비밀번호 입력칸 */}
      <div className="form-group-row">
        <label>현재 비밀번호</label>
        <input
          type="password"
          placeholder="현재 비밀번호 입력"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      {/* 새로운 비밀번호 입력칸 */}
      <div className="form-group-row">
        <label>새로운 비밀번호</label>
        <input
          type="password"
          placeholder="새로운 비밀번호 입력"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      {/* 새로운 비밀번호 확인칸 */}
      <div className="form-group-row">
        <label>비밀번호 확인</label>
        <input
          type="password"
          placeholder="비밀번호 다시 입력"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </div>

      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="button-wrapper">
        <button className="submit-btn" onClick={handleUpdate}>
          수정하기
        </button>
      </div>
    </div>
  );
};

export default Member;
