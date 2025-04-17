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
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
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
            //console.error("초대 목록 조회 실패:", response.status);
          }
        } catch (err) {
          //console.error("초대 목록 요청 중 오류:", err);
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
  );
};

export default Setting;
