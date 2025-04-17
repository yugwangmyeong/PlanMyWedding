import React, { useState } from "react";
import axios from "axios";
import CustomAlert from "./Customalert";
import InviteModal from "./Invitemodal";

const HandleInvite = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleInvite = async (email) => {
    const token = sessionStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:8081/boot/api/schedule/invites",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlertMessage("✅ 초대 요청을 보냈습니다!");
    } catch (err) {
      const errorMsg =
        err.response?.data || "서버 오류로 인해 초대를 보낼 수 없습니다.";
      setAlertMessage("❌ 초대 실패 ");
    }
    setShowAlert(true);
  };

  return (
    <>
      <button className="invite-btn" onClick={() => setShowModal(true)}>
        + 초대하기
      </button>

      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}

      <InviteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSend={handleInvite}
      />
    </>
  );
};

export default HandleInvite;
