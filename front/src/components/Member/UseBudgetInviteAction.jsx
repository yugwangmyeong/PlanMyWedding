import { useCallback } from "react";

export const UseBudgetInviteActions = ({ setBudgetInviteList }) => {
  const token = sessionStorage.getItem("token");

  const handleDisconnectBudget = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8081/boot/api/budget/shared/disconnect", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert("예산 공유 해제 완료!");
        window.location.reload();
      } else {
        alert("공유 해제 실패");
      }
    } catch (err) {
      console.error("공유 해제 오류:", err);
    }
  }, [token]);

  const handleAcceptBudgetInvite = useCallback(async (inviteId) => {
    try {
      const res = await fetch(`http://localhost:8081/boot/api/budget/accept/${inviteId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert("수락 완료!");
        setBudgetInviteList((prev) => prev.filter((i) => i.inviteId !== inviteId));
      } else {
        alert("수락 실패");
      }
    } catch (err) {
      console.error("수락 오류:", err);
    }
  }, [token, setBudgetInviteList]);

  const handleRejectBudgetInvite = useCallback(async (inviteId) => {
    try {
      const res = await fetch(`http://localhost:8081/boot/api/budget/reject/${inviteId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert("거절 완료!");
        setBudgetInviteList((prev) => prev.filter((i) => i.inviteId !== inviteId));
      } else {
        alert("거절 실패");
      }
    } catch (err) {
      console.error("거절 오류:", err);
    }
  }, [token, setBudgetInviteList]);

  return {
    handleDisconnectBudget,
    handleAcceptBudgetInvite,
    handleRejectBudgetInvite,
  };
};


// ✅ 예산 전용 공유 사용자 이름 조회
export const fetchBudgetSharedUsername = async () => {
  const token = sessionStorage.getItem("token");
  const endpoint = "http://localhost:8081/boot/api/budget/shared/username";

  try {
    const res = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      const username = await res.text(); // 응답이 text/plain인 경우
      console.log("✅ [예산] 공유 사용자 이름:", username);
      return username;
    } else if (res.status === 404) {
      console.log("ℹ️ [예산] 공유 사용자 없음");
      return null;
    } else {
      console.error("❌ [예산] 사용자 조회 실패:", res.status);
      return null;
    }
  } catch (err) {
    console.error("❌ [예산] 공유 사용자 요청 중 오류:", err);
    return null;
  }
};

