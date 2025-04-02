import React, { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Header from "./Header";
import "./styles/Calender.css";

const Calender = () => {
  const calendarRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.render();
  }, []);

  // 일정 추가 함수
  const handleAddEvent = () => {
    if (newTitle && newDate) {
      const calendarApi = calendarRef.current?.getApi();
      calendarApi?.addEvent({
        title: newTitle,
        start: newDate,
        allDay: true,
        color: "#EFA1DC",
      });
      setNewTitle("");
      setNewDate("");
      setIsModalOpen(false);
    } else {
      alert("일정 제목과 날짜를 모두 입력하세요.");
    }
  };

  return (
    <div>
      <Header />

      {/* 메인 컨텐츠 가로 정렬 */}
      <div className="calendar-container">
        {/* 왼쪽: 캘린더 */}
        <div className="calendar-box">
          <FullCalendar
            height={700}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            ref={calendarRef}
            events={[
              { title: "드레스 투어", start: "2025-04-15" },
              { title: "예시장 방문", start: "2025-04-20" },
            ]}
            dateClick={(info) => {
              alert(info.dateStr + " 날짜를 클릭했어요!");
            }}
          />
        </div>

        {/* 오른쪽: 기능 카드들 */}
        <div className="side-box">
          <button className="side-card pink" onClick={() => setIsModalOpen(true)}>
            일정 추가
          </button>
          <div className="side-card blue">일정 진행도</div>
          <div className="side-card green">할일들 체크리스트</div>
        </div>
      </div>

      {/* ✅ 모달 창 */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3>일정 추가</h3>
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
            <div className="modal-buttons">
              <button onClick={handleAddEvent}>추가하기</button>
              <button onClick={() => setIsModalOpen(false)}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calender;
