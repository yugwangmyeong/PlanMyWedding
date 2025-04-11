// useInviteActions.js
import { useCallback } from "react";

export const UseInviteActions = ({setInviteList}) => {
  const token = sessionStorage.getItem("token");

  const handleAcceptInvite = useCallback(async (inviteId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/boot/api/schedule/invites/accept/${inviteId}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        alert("✅ 초대를 수락했습니다!");
        setInviteList((prev) => prev.filter((i) => i.inviteId !== inviteId));
      } else {
        alert("❌ 초대 수락 실패");
      }
    } catch (error) {
      console.error("초대 수락 오류:", error);
    }
  }, [setInviteList]);

  const handleRejectInvite = useCallback(async (inviteId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/boot/api/schedule/invites/reject/${inviteId}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        alert("❌ 초대를 거절했습니다.");
        setInviteList((prev) => prev.filter((i) => i.inviteId !== inviteId));
      } else {
        alert("거절 실패");
      }
    } catch (error) {
      console.error("초대 거절 오류:", error);
    }
  }, [setInviteList]);

  return { handleAcceptInvite, handleRejectInvite };
};
