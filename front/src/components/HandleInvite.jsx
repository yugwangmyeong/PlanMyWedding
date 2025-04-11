import React from 'react';  
import axios from "axios";

const HandleInvite = () => {
    const handleInviteClick = async () => {
        console.log("상대방을 초대합니다")
        const email = prompt("공유할 유저의 이메일을 입력하세요:");
        if (!email) return;

        const token = sessionStorage.getItem("token"); // ✅ JWT 토큰 꺼내기
    
        try {
            await axios.post(
                "http://localhost:8081/boot/api/schedule/invites",
                { email },
                {
                  headers: {
                    Authorization: `Bearer ${token}`, // ✅ 헤더에 토큰 포함
                  },
                });
          alert("✅ 초대 요청을 보냈습니다!");
        } catch (err) {
          console.error("❌ 초대 실패:", err);
          alert("❌ 초대 실패: " + (err.response?.data?.message || "서버 오류"));
        }
      };
    
      return (
        <button className="invite-btn" onClick={handleInviteClick}>
          + 초대하기
        </button>
      );
};

export default HandleInvite
