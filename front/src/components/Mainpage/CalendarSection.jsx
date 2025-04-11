<<<<<<< HEAD
import React from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import '../styles/calendarsection.css';
=======
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/calendarsection.css";
>>>>>>> origin/main

const renderDotEvent = (arg) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "10px",
<<<<<<< HEAD
        marginTop: "4px"
=======
        marginTop: "4px",
>>>>>>> origin/main
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
<<<<<<< HEAD
    <div className='calendar-a'>
    <div className="calendar-container">
      <div className="calendar-box">
        <div className="calendar-wrapper">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev",
              center: "title",
              right: "next"
            }}
            locale="ko"
            height={400}            // 부모 높이 기준
            fixedWeekCount={true} // 항상 6주 노출
            dateClick={(info) => alert(`${info.dateStr} 선택됨`)}
            events={[
              { title: "드레스 피팅", date: "2025-04-17" },
              { title: "예복 맞춤", date: "2025-04-24" },
            ]}
            eventDisplay="list-item" // 또는 'dot'은 커스터마이징에 한계 있어
            eventContent={renderDotEvent} // ✅ 아래 함수로 완전 커스터마이징
            eventClick={(info) => {
              alert(`📌 ${info.event.title}\n📅 ${info.event.startStr}`);
            }}
          />
            
          
        </div>
            
      </div>
    </div>
    </div>
  );
    }
    

export default CalendarSection
=======
    <div className="calendar-a">
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
              height={400} // 부모 높이 기준
              fixedWeekCount={true} // 항상 6주 노출
              dateClick={(info) => alert(`${info.dateStr} 선택됨`)}
              events={[
                { title: "드레스 피팅", date: "2025-04-17" },
                { title: "예복 맞춤", date: "2025-04-24" },
              ]}
              eventDisplay="list-item" // 또는 'dot'은 커스터마이징에 한계 있어
              eventContent={renderDotEvent} // ✅ 아래 함수로 완전 커스터마이징
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
>>>>>>> origin/main
