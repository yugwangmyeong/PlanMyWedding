<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Setting.css";
import { UseInviteActions } from "./UseInviteActions";
import { fetchSharedUsername } from "./UseInviteActions";
import Footer from "../Footer";

const Setting = () => {
  const [inviteList, setInviteList] = useState([]);
  const [sharedUsername, setSharedUsername] = useState(null);
  const { handleAcceptInvite, handleRejectInvite, handleDisconnect } =
    UseInviteActions({ setInviteList });
=======
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Setting.css";
import Header from "../Header";

const Setting = () => {
>>>>>>> origin/JSG3
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
<<<<<<< HEAD
      const fetchInvites = async () => {
        try {
          const response = await fetch(
            "http://localhost:8081/boot/api/schedule/invites",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setInviteList(data);
          } else {
            console.error("초대 목록 조회 실패:", response.status);
          }
        } catch (err) {
          console.error("초대 목록 요청 중 오류:", err);
        }
      };

      // ✅ fetchSharedUsername 결과 처리
      const fetchUsername = async () => {
        const username = await fetchSharedUsername();
        setSharedUsername(username);
      };

      fetchInvites();
      fetchUsername(); // ✅ async/await 처리
    }
  }, [navigate]);

  return (
    <div>
      <div className="right-container">
        <div className="title">설정</div>
        <div className="sub-title" style={{ marginTop: "30px" }}>
          
        </div>

        {/* ✅ 공유 중인 사용자 정보 표시 */}
        {sharedUsername && (
          <div className="setting-section">
            <span className="setting-label">
              📎 현재 <strong>{sharedUsername}</strong> 님과 일정 공유 중입니다.
            </span>
            <button className="disconnect-btn" onClick={handleDisconnect}>
              <span
                className="material-symbols-outlined"
                style={{ verticalAlign: "middle", marginRight: "8px" }}
              >
                link_off
              </span>
              공유 해제
            </button>
          </div>
        )}

        {!sharedUsername && (
          <div className="setting-section">
            <span className="setting-label">
              🔒 현재 공유된 사용자가 없습니다.
            </span>
          </div>
        )}

        {/* ✅ 초대 요청 목록 */}
        <div className="invite-list-box">
          {inviteList.length === 0 ? (
            <p className="empty-invite">받은 초대 요청이 없습니다.</p>
          ) : (
            <ul className="invite-list">
              {inviteList.map((invite) => (
                <li key={invite.inviteId} className="invite-item">
                  <span>
                    📩 <strong>{invite.inviterName}</strong> 님이 일정을
                    공유했습니다.
                  </span>
                  <div className="invite-actions">
                    <button
                      className="accept-btn"
                      onClick={() => handleAcceptInvite(invite.inviteId)}
                    >
                      수락
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleRejectInvite(invite.inviteId)}
                    >
                      거절
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
=======
      console.log("현재 저장된 토큰:", token);
    }
  }, [navigate]);

 

  const handleLogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      sessionStorage.removeItem("token");
      window.location.href = "/mainpage"; // 새로고침 포함한 이동
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("정말 회원 탈퇴하시겠습니까?")) return;

    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("http://192.168.219.50:8081/boot/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("회원 탈퇴가 완료되었습니다.");
        sessionStorage.removeItem("token");
        navigate("/mainpage");
      } else {
        const errorData = await response.text();
        alert(errorData);
      }
    } catch (error) {
      console.error("회원 탈퇴 중 오류:", error);
      alert("회원 탈퇴 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      
    
        {/* 오른쪽 콘텐츠 */}
        <div className="right-container">
          <div className="title">설정</div>
          <div className="sub-title" style={{ marginTop: "30px" }}>캘린더 설정</div>

          <div className="setting-section">
            <span className="setting-label">일주일 시작요일 선택</span>
            <div className="toggle-wrapper">
              <input type="checkbox" id="chk1" className="toggle-input" />
              <label htmlFor="chk1" className="toggle-label"></label>
            </div>
          </div>
        </div>
        </div>
>>>>>>> origin/JSG3
  );
};

export default Setting;
