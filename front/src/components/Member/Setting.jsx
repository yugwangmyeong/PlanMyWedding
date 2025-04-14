import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendBudgetInvite } from "./BudgetinviteApi";
import "../styles/Setting.css";
import { UseInviteActions, fetchSharedUsername } from "./UseInviteActions";
import {
  UseBudgetInviteActions,
  fetchBudgetSharedUsername,
} from "./UseBudgetInviteAction";
import Footer from "../Footer";

const Setting = () => {
  const [budgetInviteList, setBudgetInviteList] = useState([]); // ⬅️ 예산 초대 목록
  const [budgetSharedUsername, setBudgetSharedUsername] = useState(null); // ⬅️ 예산 공유된 사용자

  const [inviteList, setInviteList] = useState([]);
  const [sharedUsername, setSharedUsername] = useState(null);
  const { handleAcceptInvite, handleRejectInvite, handleDisconnect } =
    UseInviteActions({ setInviteList });

  const {
    handleAcceptBudgetInvite,
    handleRejectBudgetInvite,
    handleDisconnectBudget,
  } = UseBudgetInviteActions({ setBudgetInviteList });

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      const fetchInvites = async () => {
        try {
          const [scheduleRes, budgetRes] = await Promise.all([
            fetch("http://localhost:8081/boot/api/schedule/invites", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch("http://localhost:8081/boot/api/budget/invites", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

          if (scheduleRes.ok) {
            const scheduleData = await scheduleRes.json();
            setInviteList(scheduleData);
          } else {
            console.error("일정 초대 조회 실패:", scheduleRes.status);
          }

          if (budgetRes.ok) {
            const budgetData = await budgetRes.json();
            console.log("💸 예산 초대 목록:", budgetData);
            setBudgetInviteList(budgetData); // 예산 초대용 useState 필요
          } else {
            console.error("예산 초대 조회 실패:", budgetRes.status);
          }
        } catch (err) {
          console.error("초대 목록 요청 중 오류:", err);
        }
      };
      const fetchUsername = async () => {
        try {
          const username = await fetchSharedUsername();
          console.log("📎 일정 공유자 이름:", username);
          setSharedUsername(username);
  
          const budgetName = await fetchBudgetSharedUsername();
          console.log("💰 예산 공유자 이름:", budgetName);
          setBudgetSharedUsername(budgetName);
        } catch (err) {
          console.error("공유 사용자 이름 요청 실패:", err);
        }
      };

      fetchInvites();
      fetchUsername(); // ✅ async/await 처리
    }
  }, [navigate]);

  return (
    <div className="right-container">
      <div className="title">설정</div>

      {/* 📅 일정 관리 */}
      <div className="sub-title" style={{ marginTop: "40px" }}>
        📅 <strong>일정 관리</strong>
      </div>

      {sharedUsername ? (
        <div className="setting-section">
          <div className="setting-row">
            <span className="setting-label">
              📎 현재 <strong>{sharedUsername}</strong> 님과 일정 공유 중입니다.
            </span>
            <button className="disconnect-btn" onClick={handleDisconnect}>
              <span
                className="material-symbols-outlined"
                style={{ marginRight: "4px" }}
              >
                link_off
              </span>
              공유 해제
            </button>
          </div>
        </div>
      ) : (
        <div className="setting-section">
          <span className="setting-label">
            🔒 현재 일정을 공유 중인 사용자가 없습니다.
          </span>
        </div>
      )}

      <div className="invite-list-box">
        {inviteList.length === 0 ? (
          <p className="empty-invite">받은 일정 초대 요청이 없습니다.</p>
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

      {/* 💸 예산 관리 */}
      <div className="sub-title" style={{ marginTop: "50px" }}>
        💸 <strong>예산 관리</strong>
      </div>

      {budgetSharedUsername ? (
        <div className="setting-section">
          <div className="setting-row">
            <span className="setting-label">
              📎 현재 <strong>{budgetSharedUsername}</strong> 님과 예산 공유
              중입니다.
            </span>
            <button className="disconnect-btn" onClick={handleDisconnectBudget}>
              <span
                className="material-symbols-outlined"
                style={{ marginRight: "4px" }}
              >
                link_off
              </span>
              공유 해제
            </button>
          </div>
        </div>
      ) : (
        <div className="setting-section">
          <span className="setting-label">
            🔒 현재 예산을 공유 중인 사용자가 없습니다.
          </span>
        </div>
      )}

      <div className="invite-list-box">
        {budgetInviteList.length === 0 ? (
          <p className="empty-invite">받은 예산 초대 요청이 없습니다.</p>
        ) : (
          <ul className="invite-list">
            {budgetInviteList.map((invite) => (
              <li key={invite.inviteId} className="invite-item">
                <span>
                  📩 <strong>{invite.inviter.username}</strong> 님이 예산을
                  공유했습니다.
                </span>
                <div className="invite-actions">
                  <button
                    className="accept-btn"
                    onClick={() => handleAcceptBudgetInvite(invite.id)}
                  >
                    수락
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleRejectBudgetInvite(invite.id)}
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
  );
};

export default Setting;
