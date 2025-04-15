import React, { useState, useEffect } from "react";
import "./weddingdatemodal.css";
import { saveWeddingDate } from "./WeddingApi";
const WeddingDateModal = ({ weddingDate, setWeddingDate, onSuccess }) => {
  const handleConfirm = async () => {
    if (!weddingDate) {
      alert("날짜를 선택해주세요.");
      return;
    }

    try {
      const saved = await saveWeddingDate(weddingDate);
      alert("결혼식 날짜가 저장되었습니다!");
      onSuccess(saved.reservedAt);

      // ✅ 페이지 새로고침
      window.location.reload();

    } catch (err) {
      //console.error("날짜 저장 실패:", err);
      alert("날짜 저장에 실패했습니다.");
    }
  };

  return (
    <div className="wedding-modal-backdrop">
      <div className="wedding-modal">
        <h3>결혼식 날짜를 입력해주세요</h3>
        <input
          type="date"
          value={weddingDate}
          onChange={(e) => setWeddingDate(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleConfirm}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default WeddingDateModal;
