import React, { useState, useEffect } from "react";
import "./weddingaccordion.css";

const WeddingAccordion = ({
  weddingDate,
  schedules = [],
  onAddEvent,
  onScheduleSelect,
  setHighlightedDate,
}) => {
  const [openCategory, setOpenCategory] = useState(null);
  const [daysLeft, setDaysLeft] = useState(0);
  const [progress, setProgress] = useState(0);

  // 카테고리 매핑 객체
  const categoryDisplayMap = {
    wedding: "결혼식",
    weddingTemplate: "결혼 템플릿",
    preparation: "준비 목록",
    essential: "필수 일정",
    etc: "기타 준비",
    custom: "기타",
  };

  useEffect(() => {
    if (!weddingDate) return;
    const wedding = new Date(weddingDate);
    const today = new Date();
    const totalDays = Math.ceil((wedding - today) / (1000 * 60 * 60 * 24));
    setDaysLeft(totalDays);

    const completedCount = schedules.filter(
      (s) => s.scheStatus === "완료"
    ).length;
    const progressValue =
      schedules.length > 0 ? (completedCount / schedules.length) * 100 : 0;
    setProgress(progressValue);
  }, [weddingDate, schedules]);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const handleScheduleClick = (schedule) => {
    onScheduleSelect(schedule);
  };

  const groupedSchedules = schedules.reduce((acc, schedule) => {
    const category = schedule.scheCategory || "기타";
    if (!acc[category]) acc[category] = [];
    acc[category].push(schedule);
    return acc;
  }, {});

  return (
    <div className="calendar-main-side">
      <div className="sides-box">
        <button className="sides-card pinks" onClick={onAddEvent}>
          일정 추가
        </button>

        <div className="sides-card blues">
          일정 진행도 D-{daysLeft}
          <br />
          <progress
            className="progress"
            value={progress.toFixed(0)}
            min="0"
            max="100"
          />
          <span>{Math.round(progress)}%</span>
        </div>

        <div className="sides-card accordions">
          {Object.entries(groupedSchedules).map(([category, items]) => (
            <div key={category}>
              <div
                className={`accordions-title ${
                  openCategory === category ? "active" : ""
                }`}
                onClick={() => toggleCategory(category)}
              >
                {categoryDisplayMap[category] || category}
                <span>{openCategory === category ? "▲" : "▼"}</span>
              </div>
              {openCategory === category && (
                <div className="accordions-content">
                  {items.length > 0 ? (
                    items.map((schedule) => (
                      <button
                        key={schedule.scheIdx}
                        className="schedule-button"
                        onClick={() => handleScheduleClick(schedule)}
                      >
                        {schedule.scheTitle}
                        <small>
                          {schedule.scheCategory === "wedding"
                            ? new Date(schedule.reservedAt).toLocaleDateString(
                                "ko-KR"
                              )
                            : new Date(
                                schedule.scheduleDate
                              ).toLocaleDateString("ko-KR")}
                        </small>
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">일정 없음</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeddingAccordion;
