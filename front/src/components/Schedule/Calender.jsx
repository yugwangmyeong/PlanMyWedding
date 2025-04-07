import React, { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/Calender.css";
import Header from "../Header";

const Calender = () => {
  const calendarRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);
  const [weddingItems, setWeddingItems] = useState([
    {
      category: "웨딩홀",
      items: [
        { title: "웨딩홀 투어", date: "2025-04-15", completed: false },
        { title: "웨딩홀 예약", date: "2025-04-16", completed: false },
      ],
    },
    {
      category: "스드메",
      items: [
        { title: "드레스 투어", date: "2025-04-17", completed: false },
        { title: "드레스 예약", date: "2025-04-18", completed: false },
      ],
    },
    {
      category: "허니문",
      items: [
        { title: "신혼여행 상담", date: "2025-04-19", completed: false },
        { title: "신혼여행 당일", date: "2025-04-20", completed: false },
      ],
    },
    {
      category: "혼수품",
      items: [
        { title: "한복 챙기기", date: "2025-04-21", completed: false },
        { title: "예복 구입", date: "2025-04-22", completed: false },
        { title: "한복 가봉", date: "2025-04-23", completed: false },
      ],
    },
    {
      category: "기타",
      items: [{ title: "상견례 준비", date: "2025-04-24", completed: false }],
    },
  ]);

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.render();
  }, []);

  const handleAddOrUpdateEvent = () => {
    const calendarApi = calendarRef.current?.getApi();

    if (!newTitle || !newDate || !newEndDate) {
      alert("제목, 시작일, 종료일을 모두 입력하세요.");
      return;
    }

    if (selectedEvent) {
      selectedEvent.setProp("title", newTitle);
      selectedEvent.setStart(newDate);
      selectedEvent.setEnd(newEndDate);
      selectedEvent.setProp("color", isCompleted ? "#ff1493" : "#EFA1DC");
    } else {
      calendarApi?.addEvent({
        title: newTitle,
        start: newDate,
        end: newEndDate,
        color: isCompleted ? "#ff1493" : "#EFA1DC",
        allDay: true,
      });
    }

    resetForm();
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      selectedEvent.remove();
      resetForm();
    }
  };

  const resetForm = () => {
    setNewTitle("");
    setNewDate("");
    setNewEndDate("");
    setIsCompleted(false);
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const handleEventDrop = (info) => {
    alert(
      `${info.event.title} 일정이 ${info.event.startStr}로 이동되었습니다.`
    );
  };

  const handleEventClick = (info) => {
    const event = info.event;
    setSelectedEvent(event);
    setNewTitle(event.title);
    setNewDate(event.startStr);
    setNewEndDate(event.endStr || event.startStr);
    setIsCompleted(event.backgroundColor === "#ff1493");
    setIsModalOpen(true);
  };

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const handleCheckboxToggle = (category, itemTitle) => {
    setWeddingItems((prev) =>
      prev.map((cat) =>
        cat.category === category
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.title === itemTitle
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            }
          : cat
      )
    );
  };

  return (
    <div>
      <Header></Header>
      <div className="title-wrap">
        <h1 className="maintitle">일정관리</h1>
        <button className="invite-btn">+ 초대하기</button>
      </div>
      <div className="calendar-b">
        <hr className="custom-line" />
        <div className="container">
          <div className="calendars-container">
            <div className="calendars-box">
              <FullCalendar
                eventColor="#EFA1DC"
                height={700}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                ref={calendarRef}
                editable={true}
                eventStartEditable={true}
                eventDurationEditable={true}
                selectable={true}
                selectMirror={true}
                eventDrop={handleEventDrop}
                eventClick={handleEventClick}
                dateClick={(info) => {
                  setSelectedEvent(null);
                  setNewTitle("");
                  setNewDate(info.dateStr);
                  setNewEndDate(info.dateStr);
                  setIsCompleted(false);
                  setIsModalOpen(true);
                }}
                events={[
                  {
                    title: "웨딩홀 투어",
                    start: "2025-04-15",
                    end: "2025-04-16",
                    color: "#EFA1DC",
                  },
                  {
                    title: "웨딩홀 예약",
                    start: "2025-04-20",
                    end: "2025-04-21",
                    color: "#EFA1DC",
                  },
                ]}
              />
            </div>

            <div className="sides-box">
              <button
                className="sides-card pinks"
                onClick={() => {
                  setSelectedEvent(null);
                  setNewTitle("");
                  setNewDate("");
                  setNewEndDate("");
                  setIsCompleted(false);
                  setIsModalOpen(true);
                }}
              >
                일정 추가
              </button>

              <div className="sides-card blues">
                일정 진행도 D-365
                <br />
                <progress
                  className="progress"
                  id="progress"
                  value="50"
                  min="0"
                  max="100"
                ></progress>
              </div>

              <div className="sides-card accordions">
                {weddingItems.map(({ category, items }) => (
                  <div key={category}>
                    <div
                      className={`accordions-title ${
                        openCategory === category ? "active" : ""
                      }`}
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                      <span>{openCategory === category ? "▲" : "▼"}</span>
                    </div>
                    {openCategory === category && (
                      <ul className="accordions-content">
                        {items.length > 0 ? (
                          items.map((item) => (
                            <li
                              key={item.title}
                              className="flex items-center gap-2"
                            >
                              <span
                                className={
                                  item.completed
                                    ? "line-through text-gray-400"
                                    : ""
                                }
                              >
                                {item.title}
                              </span>
                              <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={() =>
                                  handleCheckboxToggle(category, item.title)
                                }
                              />
                            </li>
                          ))
                        ) : (
                          <li className="text-sm text-gray-400">일정 없음</li>
                        )}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {isModalOpen && (
            <div className="modals-backdrop">
              <div className="modals-content">
                <h3>{selectedEvent ? "일정 수정" : "일정 추가"}</h3>
                <input
                  type="text"
                  placeholder="일정 제목"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
                <input
                  type="date"
                  value={newEndDate}
                  onChange={(e) => setNewEndDate(e.target.value)}
                />
                <label style={{ marginTop: "10px" }}>
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={(e) => setIsCompleted(e.target.checked)}
                  />{" "}
                  완료 여부
                </label>
                <div className="modals-buttons">
                  <button onClick={handleAddOrUpdateEvent}>
                    {selectedEvent ? "수정하기" : "추가하기"}
                  </button>
                  {selectedEvent && (
                    <button
                      onClick={handleDeleteEvent}
                      style={{ background: "#f06292", color: "white" }}
                    >
                      삭제하기
                    </button>
                  )}
                  <button
                    onClick={resetForm}
                    style={{ marginLeft: "10px", background: "#ccc" }}
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calender;
