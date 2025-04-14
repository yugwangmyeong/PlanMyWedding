// BudgetInviteApi.js

export const sendBudgetInvite = async (email) => {
    const token = sessionStorage.getItem("token");
  
    try {
      const res = await fetch("http://localhost:8081/boot/api/budget/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });
  
      if (res.ok) {
        console.log("✅ 초대 전송 성공:", email);
        return true;
      } else {
        console.warn("❌ 초대 실패:", res.status);
        return false;
      }
    } catch (err) {
      console.error("❌ 예산 초대 요청 오류:", err);
      return false;
    }
  };
  