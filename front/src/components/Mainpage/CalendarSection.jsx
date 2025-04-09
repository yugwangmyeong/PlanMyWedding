import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/calendersection.css";

const renderDotEvent = (arg) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "10px",
        marginTop: "4px",
      }}
      title={arg.event.title}
    >
      <div
        style={{
          width: "6px",
          height: "6px",
          backgroundColor: "#fa5c66",
          borderRadius: "50%",
        }}
      ></div>
    </div>
  );
};

const CalendarSection = () => {
  return (
    <div className="calendar-a">
      {/* 📌 .calendar-a 안에 있어야 스타일이 먹힘 */}
      <div className="calendar-container">
        <div className="calendar-box">
          <div className="calendar-wrapper">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev",
                center: "title",
                right: "next",
              }}
              locale="ko"
              height={400}
              fixedWeekCount={true}
              dateClick={(info) => alert(`${info.dateStr} 선택됨`)}
              events={[
                { title: "드레스 피팅", date: "2025-04-17" },
                { title: "예복 맞춤", date: "2025-04-24" },
              ]}
              eventDisplay="list-item"
              eventContent={renderDotEvent}
              eventClick={(info) => {
                alert(`📌 ${info.event.title}\n📅 ${info.event.startStr}`);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;
