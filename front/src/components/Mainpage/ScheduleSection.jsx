import React from "react";
import CalendarSection from "./CalendarSection";
import "../styles/budgetsection.css";
import "./schedulesection.css";

const ScheduleSection = () => {
  return (
    <div className="section schedule-section">
      <h1 className="h2loc">일정 관리</h1>
      <CalendarSection></CalendarSection>
    </div>
  );
};

export default ScheduleSection;
