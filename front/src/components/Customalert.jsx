import React from "react";
import "./styles/customalert.css";

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert-box">
        <p className="custom-alert-message">
          {" "}
          {message.length > 25
            ? `${message.slice(0, 10)}\n${message.slice(20)}`
            : message}
        </p>
        <button className="custom-alert-button" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
