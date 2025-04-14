import React, { useState } from "react";
import "./styles/invitemodal.css"; // 스타일 분리

const InviteModal = ({ isOpen, onClose, onSend }) => {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!email) return;
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <div className="invite-modal-buttons">
          
          <button onClick={onClose} className="cancel-btn">
            취소
          </button>
          <button onClick={handleSubmit}>보내기</button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
