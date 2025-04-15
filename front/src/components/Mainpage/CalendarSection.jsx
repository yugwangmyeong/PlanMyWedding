import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import './calendersection.css';
import { getUserSchedules } from '../Schedule/utils/WeddingApi';
const renderDotEvent = (arg) => {
  const eventsOnSameDay = arg.view?.calendar?.getEvents()?.filter(
    (event) => event.startStr === arg.event.startStr
  );

  // 이 날짜에서 첫 번째 이벤트가 아니면 렌더링하지 않음
  if (eventsOnSameDay && eventsOnSameDay[0]?.id !== arg.event.id) {
    return null;
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "10px",
        marginTop: "4px"
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
  const [selectedDate, setSelectedDate] = useState(null);
  const [dailyEvents, setDailyEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAndFormatEvents = async () => {
      try {
        const data = await getUserSchedules();
        const formatted = data.map((item, index) => ({
          id: `${item.scheduleDate}-${index}`, // 고유 ID 보장
          title: item.scheTitle,
          date: item.scheduleDate,
        }));
        setEvents(formatted);
      } catch (err) {
        //console.error("📛 일정 조회 실패:", err);
      }
    };

    fetchAndFormatEvents();
  }, []);

  return (
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
              height={400}
              fixedWeekCount={true}
             
              events={events}
              eventDisplay="list-item"
              eventContent={renderDotEvent}
              dateClick={(info) => {
                const clickedDate = info.dateStr;
                const filtered = events.filter(
                  (event) => event.date === clickedDate
                );
                setSelectedDate(clickedDate);
                setDailyEvents(filtered);
                setIsModalOpen(true);
              }}
             
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="calendar-modal-backdrop">
          <div className="calendar-modal">
            <h1 className="calendar-modal-title">📅 {selectedDate} 일정</h1>

            <div className="calendar-modal-content">
              {dailyEvents.length > 0 ? (
                dailyEvents.map((event, idx) => (
                  <div key={idx} className="calendar-modal-card">
                    <h4>{event.title}</h4>
                   
                  </div>
                ))
              ) : (
                <p className="calendar-modal-empty">일정이 없습니다.</p>
              )}
            </div>

            <button
              className="calendar-modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
    }
    

export default CalendarSection
