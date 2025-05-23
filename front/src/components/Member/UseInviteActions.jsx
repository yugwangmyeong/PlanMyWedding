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
      //console.error("초대 수락 오류:", error);
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
      //console.error("초대 거절 오류:", error);
    }
  }, [setInviteList]);

  return { handleAcceptInvite, handleRejectInvite,handleDisconnect};
};

const handleDisconnect = async () => {
    const token = sessionStorage.getItem("token");
  
    try {
      const response = await fetch("http://localhost:8081/boot/api/schedule/invites/disconnect", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        alert("공유된 일정이 해제되었습니다.");
        window.location.reload(); // 새로고침해서 일정 다시 불러오기
      } else {
        alert("공유 해제 실패");
      }
    } catch (err) {
      //console.error("공유 해제 요청 중 오류:", err);
    }
  };

  // ✅ UseInviteActions.js 하단에 추가

export const fetchSharedUsername = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response= await fetch("http://localhost:8081/boot/api/schedule/shared-username", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.text();
        //console.log("🔗 공유된 사용자 이름:", data);
        return data;
      } else if (response.status === 404) {
        //console.log("✅ 공유된 사용자 없음");
        return null;
      } else {
        //console.error("❌ 공유된 사용자 조회 실패:", response.status);
        return null;
      }
    } catch (err) {
      //console.error("❌ 공유된 사용자 조회 오류:", err);
      return null;
    }
  
  };
  