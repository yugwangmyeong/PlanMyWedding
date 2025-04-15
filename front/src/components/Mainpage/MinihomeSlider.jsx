// MinihomeSlider.jsx
import React, { useState } from "react";
import pictureDataList from "./pictureData";
import "./minihomesection.css";

const MinihomeSlider = ({ templates }) => {
  const today = new Date();

  // 14일 이내 일정 필터링
  const upcomingEvents = templates.filter((item) => {
    const dateStr = item.scheduleDate;
    if (!dateStr) return false;
  
    const eventDate = new Date(dateStr + "T00:00:00");
    const diff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
  
    // 포함할 대상
    const isWeddingTemplate = item.scheCategory === "weddingTemplate";
    const isWeddingDay = item.scheCategory === "wedding" || item.scheTitle === "결혼식";
  
    // 실제로 이미지가 있는 일정만 포함
    const hasPicture = pictureDataList.some(
      (pic) => pic.miniItem === item.scheTitle
    );
  
    return (
      (isWeddingTemplate || isWeddingDay) &&
      diff >= 0 &&
      diff <= 14 &&
      hasPicture
    );
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentEvent = upcomingEvents[currentIndex];

  const pictureData =
    pictureDataList.find((item) => item.miniItem === currentEvent?.scheTitle) ||
    pictureDataList.find((item) => item.miniItem === "대기화면");

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % upcomingEvents.length);
  };

  // 현재 이벤트가 있을 경우, 날짜를 ko-KR 형식으로 포맷
  const formattedDate = currentEvent
    ? new Date(currentEvent.scheduleDate).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <>
      <div className={`minihome-content ${pictureData?.miniLoc}`}>
      {formattedDate && <p className="minihome-date">{formattedDate}</p>}
        <img
          className="minihome-image"
          src={pictureData.miniImg}
          alt={pictureData.miniItem}
        />
        <p className="minihome-text">{pictureData.miniArticle}</p>
      </div>

      {upcomingEvents.length > 1 && (
        <div className="minihome-nav-buttons">
          <button onClick={handlePrev}>◀ 이전</button>
          <span>
            {currentIndex + 1} / {upcomingEvents.length}
          </span>
          <button onClick={handleNext}>다음 ▶</button>
        </div>
      )}
    </>
  );
};

export default MinihomeSlider;
