// components/InviteModal.jsx
import React, { useState } from "react";
import "../styles/invitemodal.css"; // 스타일 따로 관리

const InviteModal = ({ isOpen, onClose, onSend }) => {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!email) return;
    console.log("📤 전송할 이메일:", email); // ✅ 콘솔 출력

    onSend(email);
    setEmail("");
    onClose();
  };

  return (
    <div className="invite-modal-backdrop">
      <div className="invite-modal">
        <h3>📧 초대할 이메일 입력</h3>
        <input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="invite-modal-buttons">
          <button className="cancel-btn" onClick={onClose}>
            취소
          </button>
          <button onClick={handleSubmit}>보내기</button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
