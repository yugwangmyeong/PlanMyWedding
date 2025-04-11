import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Setting.css";
import { UseInviteActions } from "./UseInviteActions";
import Footer from "../Footer";

const Setting = () => {
  // useState 선언되어 있어야 함
  const [inviteList, setInviteList] = useState([]);
  const { handleAcceptInvite, handleRejectInvite } = UseInviteActions({setInviteList});
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      console.log("현재 저장된 토큰:", token);

      // ✅ 초대 목록 불러오기
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
            console.log("📩 받은 초대 목록:", data);
            setInviteList(data); // ✅ 초대 목록 상태에 저장
          } else {
            console.error("초대 목록 조회 실패:", response.status);
          }
        } catch (err) {
          console.error("초대 목록 요청 중 오류:", err);
        }
      };

      fetchInvites(); // 📡 API 호출
    }
  }, [navigate]);

  return (
    <div>
      {/* 오른쪽 콘텐츠 */}
      <div className="right-container">
        <div className="title">설정</div>
        <div className="sub-title" style={{ marginTop: "30px" }}>
          캘린더 설정
        </div>

        <div className="setting-section">
          <span className="setting-label">
            정보공유(초대한사람/초대받은사람)
          </span>
          <div className="toggle-wrapper">
            <input type="checkbox" id="chk1" className="toggle-input" />
            <label htmlFor="chk1" className="toggle-label"></label>
          </div>
        </div>

        {/* ✅ 초대 요청 목록은 따로 아래로 분리 */}
        {/* ✅ 초대 요청 리스트 박스: setting-section 아래에 위치 */}
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
  );
};

export default Setting;
