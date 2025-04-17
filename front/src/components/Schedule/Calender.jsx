import React, { useState, useEffect, useRef } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import ko from "date-fns/locale/ko";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendermain.css";
import Header from "../Header";
import Footer from "../Footer";
import CustomToolbar from "./utils/CustomToolbar";
import WeddingDateModal from "./utils/WeddingDateModal";
import useWeddingDate from "./utils/useWeddingDate";
import EventModal from "./EventModal";
import CustomAlert from "../Customalert";
import WeddingTemplateAutoSaver from "./utils/WeddingTemplateSaver";
import WeddingAccordion from "./WeddingAccordion"; // 컴포넌트 경로에 맞게 수정
import {
  getWeddingDate,
  saveWeddingDate,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getUserSchedules,
  saveWeddingTemplate,
} from "./utils/WeddingApi";
import HandleInvite from "../HandleInvite";


const locales = { ko };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const [weddingDateInput, setWeddingDateInput] = useState("");
  const [showWeddingModal, setShowWeddingModal] = useState(false);
  const { weddingDate } = useWeddingDate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [category, setCategory] = useState("custom");
  const [schedules, setSchedules] = useState([]);
  const [highlightedDate, setHighlightedDate] = useState(null);
  const calendarRef = useRef();
  const handleCloseAlert = () => setIsAlertVisible(false);
  const [isSharedUser, setIsSharedUser] = useState(false);
  const [clickCoords, setClickCoords] = useState({ x: 0, y: 0 });
  const [morePopupInfo, setMorePopupInfo] = useState({
    isOpen: false,
    date: null,
    events: [],
  });




  // 🔹 일정 추가
  const handleAddEvent = async () => {
    if (isSharedUser) {
      alert("공유 일정 사용자로, 일정 추가는 불가능합니다.");
      return;
    }
    //console.log("➕ 추가 시도 - title:", newTitle, "date:", newDate);

    const eventData = {
      scheTitle: newTitle,
      scheduleDate: newDate,
      scheStatus: isCompleted ? "완료" : "예정",
      scheCategory: category,
    };

    try {
      await createSchedule(eventData);
      resetForm();
      fetchEvents();
    } catch (err) {
      //console.error("일정 추가 실패:", err);
    }
  };

  // 🔹 일정 수정
  const handleUpdateEvent = async () => {
    //console.log("✏️ 수정 시도 - title:", newTitle, "date:", newDate);
    if (!selectedEvent?.scheIdx) return;

    // ✅ 템플릿은 카테고리 유지
    const fixedCategory =
      selectedEvent?.scheCategory === "weddingTemplate"
        ? category === "weddingTemplate"
          ? "weddingTemplate"
          : category // 유지하고 싶을 때만 고정
        : category;

    const eventData = {
      scheTitle: newTitle,
      scheduleDate: newDate,
      scheStatus: isCompleted ? "완료" : "예정",
      scheCategory: category,
    };
    // 확인한 값을 다시 로그로 출력
    //console.log("🟢 이벤트 데이터:", eventData);

    try {
      await updateSchedule(selectedEvent.scheIdx, eventData);
      resetForm();
      fetchEvents();
    } catch (err) {
      //console.error("일정 수정 실패:", err);
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent?.scheIdx) return;

    try {
      await deleteSchedule(selectedEvent.scheIdx);
      resetForm();
      fetchEvents();
    } catch (err) {
      //console.error("일정 삭제 실패:", err);
    }
  };

  const resetForm = () => {
    setSelectedEvent(null);
    setNewTitle("");
    setNewDate("");
    setNewEndDate("");
    setIsCompleted(false);
    setIsModalOpen(false);
  };

  const fetchEvents = async () => {
    try {
      const data = await getUserSchedules();
      setSchedules(data); // 👈 원본 데이터 저장

      const formatted = data.map((item) => ({
        title: item.scheTitle,
        start: new Date(item.scheduleDate),
        end: new Date(item.scheduleDate),
        color:
          item.scheCategory === "essential"
            ? "#FFB6B9"
            : item.scheCategory === "preparation"
            ? "#fa5c66"
            : item.scheCategory === "weddingTemplate"
            ? "#E0BBE4"
            : "#FF0B55",
        scheIdx: item.scheIdx,
        scheCategory: item.scheCategory, // ✅ 이거 포함
        scheStatus: item.scheStatus, // ✅ 이거도 같이
      }));
      setEvents(formatted);
    } catch (err) {
      //console.error("일정 조회 실패:", err);
    }
  };

  const handleAddEventModal = () => {
    if (isSharedUser) {
      alert("공유된 일정에서는 직접 추가할 수 없습니다.");
      return;
    }
    setSelectedEvent(null);
    setNewTitle("");
    setNewDate(new Date().toISOString().split("T")[0]);
    setCategory("custom");
    setIsCompleted(false);
    setIsModalOpen(true);
  };

  const fetchAllEvents = async (setEvents, setSchedules) => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    try {
      // 1️⃣ 공유 일정 먼저 시도
      const sharedRes = await fetch(
        "http://localhost:8081/boot/api/schedule/events/shared",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (sharedRes.ok) {
        const sharedData = await sharedRes.json();
        if (sharedData.length > 0) {
          // 👉 공유 일정 존재 시
          const formatted = sharedData.map((item) => ({
            title: item.scheTitle + " (공유)",
            start: new Date(item.scheduleDate),
            color:
              item.scheCategory === "essential"
                ? "#c5c1f9"
                : item.scheCategory === "preparation"
                ? "#b8d1ff"
                : item.scheCategory === "weddingTemplate"
                ? "#d3f8ff"
                : item.scheCategory === "wedding"
                ? "#ffe29a"
                : "#d3d3d3",
            scheIdx: item.scheIdx,
            isShared: true,
            end: new Date(item.scheduleDate), // ✅ 필수
            scheCategory: item.scheCategory, // ✅ 모달 값 설정에 필요
            scheStatus: item.scheStatus, // ✅ 색상 로직 및 완료여부에 필요
          }));

          setEvents(formatted);
          setSchedules(sharedData); // ✅ 공유 일정도 아코디언에 보내기
          setIsSharedUser(true); // ✅ 공유받은 사용자임
          return; // 💡 여기서 return 때문에 아래 코드는 실행되지 않음!
        }
      }

      setIsSharedUser(false);

      // 2️⃣ 공유 일정 없으면 본인 일정 조회
      const myData = await getUserSchedules();
      //console.log("📦 getUserSchedules() 결과:", myData);

      const formattedMy = myData.map((item) => ({
        title: item.scheTitle,
        start: new Date(item.scheduleDate),
        end: new Date(item.scheduleDate),
        color:
          item.scheCategory === "essential"
            ? "#c5c1f9"
            : item.scheCategory === "preparation"
            ? "#b8d1ff"
            : item.scheCategory === "weddingTemplate"
            ? "#d3f8ff"
            : item.scheCategory === "wedding"
            ? "#ffe29a"
            : "#d3d3d3",
        scheIdx: item.scheIdx,
        isShared: false,
        scheCategory: item.scheCategory, // ✅ 포함
        scheStatus: item.scheStatus,
      }));

      setEvents(formattedMy);
      setSchedules(myData);
      setIsSharedUser(false); // 👈 개인 사용자로 인식
    } catch (err) {
      //console.error("❌ 전체 일정 로딩 실패:", err);
    }
  };

  useEffect(() => {
    const checkWeddingDate = async () => {
      try {
        const existingWeddingDate = await getWeddingDate();
        if (!existingWeddingDate) {
          setShowWeddingModal(true);
        }
      } catch (err) {
        //console.error("결혼식 날짜 조회 실패:", err);
        setAlertMessage("결혼식 날짜 조회에 실패했습니다.");
        setIsAlertVisible(true);
      }
    };

    checkWeddingDate();
    fetchAllEvents(setEvents, setSchedules);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setClickCoords({ x: e.clientX, y: e.clientY });
    };

    const calendarRoot = document.querySelector(".calendar-main-wrapper");
    if (calendarRoot) {
      calendarRoot.addEventListener("click", handleClick);
    }

    return () => {
      if (calendarRoot) {
        calendarRoot.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <>
      <Header />
      {/* 일정관리~초대하기와 달력 영역을 감싸는 컨테이너에 고정 범위를 부여 */}
      <div className="calendar-wrapper fixed-range">
        <div className="title-wrap">
          <h1 className="maintitle">일정관리</h1>
          <div className="handle-invite-wrapper">
            <HandleInvite />
          </div>
        </div>
      </div>
        <hr className="custom-line" />

        <div className="calendar-main-fixed">
        <div className="calendar-left">
          <div className="calendar-main-wrapper">
          <Calendar
  events={events}
  date={currentDate}
  onNavigate={(date) => setCurrentDate(date)}
  view="month"
  localizer={localizer}  // localizer는 미리 정의되어 있어야 함
  eventOrder={(a, b) => {
    // a.start와 b.start는 Date 객체라고 가정한다.
    const yearA = a.start.getFullYear();
    const yearB = b.start.getFullYear();
    if (yearA !== yearB) {
      return yearA - yearB; // 2025 이벤트가 2026 이벤트보다 먼저 오도록 정렬
    }
    // 같은 연도면 기본적으로 Date의 시간 차이로 정렬
    return a.start - b.start;
  }}
  eventPropGetter={(event) => {
    const isHighlighted = selectedEvent?.scheIdx === event.scheIdx;
    const color =
      event.scheCategory === "essential"
        ? "#8E7DBE"
        : event.scheCategory === "preparation"
        ? "#BEE4D0"
        : event.scheCategory === "weddingTemplate"
        ? "#F7CFD8"
        : event.scheCategory === "wedding"
        ? "#9FB3DF"
        : "#d3d3d3";
    return {
      style: {
        backgroundColor: isHighlighted ? "#ff6347" : color,
        borderRadius: "8px",
        color: "white",
        padding: "2px 5px",
        fontSize: "14px",
        transition: "all 0.3s ease-in-out",
        transform: isHighlighted ? "scale(1.05)" : "scale(1)",
        boxShadow: isHighlighted ? "0 0 10px #ff6347" : "none",
      },
    };
  }}
  components={{ toolbar: CustomToolbar }}
  startAccessor="start"
  endAccessor="end"
  selectable
  onSelectSlot={(slotInfo) => {
    setNewDate(new Date(slotInfo.start).toLocaleDateString("en-CA"));
    setNewEndDate(new Date(slotInfo.end).toLocaleDateString("en-CA"));
    setSelectedEvent(null);
    setIsModalOpen(true);
  }}
  onSelectEvent={(event) => {
    if (event.isShared) {
      alert("이 일정은 공유된 일정으로, 수정할 수 없습니다.");
      return;
    }
    setSelectedEvent(event);
    setNewTitle(event.title);
    setNewDate(new Date(event.start).toLocaleDateString("en-CA"));
    setNewEndDate(new Date(event.end).toLocaleDateString("en-CA"));
    setIsCompleted(event.scheStatus === "완료");
    setCategory(event.scheCategory || "custom");
    setIsModalOpen(true);
  }}
  onShowMore={(events, date) => {
    const { x, y } = clickCoords;
    const adjustedTop = Math.min(
      y + window.scrollY,
      window.innerHeight - 220
    );
    const adjustedLeft = Math.min(
      x + window.scrollX,
      window.innerWidth - 270
    );
    setMorePopupInfo({
      isOpen: true,
      date,
      events,
      position: {
        top: adjustedTop,
        left: adjustedLeft,
      },
    });
  }}
  style={{ height: 750, width: "100%" }} 
/>

              </div>
            </div>
  
            <div className="calendar-main-side">
              <WeddingAccordion
                schedules={schedules}
                weddingDate={weddingDate}
                onAddEvent={handleAddEventModal}
                onScheduleSelect={(schedule) => {
                  setSelectedEvent(schedule);
                  setNewTitle(schedule.scheTitle);
                  setNewDate(schedule.scheduleDate);
                  setCategory(schedule.scheCategory);
                  setIsCompleted(schedule.scheStatus === "완료");
                  setHighlightedDate(schedule.scheduleDate);
                  setCurrentDate(new Date(schedule.scheduleDate));
                }}
              />
            </div>
          </div>
  
          <EventModal
            isModalOpen={isModalOpen}
            selectedEvent={selectedEvent}
            newTitle={newTitle}
            newDate={newDate}
            newEndDate={newEndDate}
            isCompleted={isCompleted}
            setNewTitle={setNewTitle}
            setNewDate={setNewDate}
            setNewEndDate={setNewEndDate}
            setIsCompleted={setIsCompleted}
            handleAddEvent={handleAddEvent}
            handleUpdateEvent={handleUpdateEvent}
            handleDeleteEvent={handleDeleteEvent}
            resetForm={resetForm}
            category={category}
            setCategory={setCategory}
          />
  
          {showWeddingModal && (
            <WeddingDateModal
              weddingDate={weddingDateInput}
              setWeddingDate={setWeddingDateInput}
              onSuccess={(savedDate) => {
                setShowWeddingModal(false);
              }}
            />
          )}
  
          {weddingDate && (
            <WeddingTemplateAutoSaver
              weddingDate={weddingDate}
              onSaved={() => fetchAllEvents(setEvents, setSchedules)}
            />
          )}
  
          {isAlertVisible && (
            <CustomAlert message={alertMessage} onClose={handleCloseAlert} />
          )}
  
  {morePopupInfo.isOpen && (
        <div
          className="more-popup-wrapper"
          style={{
            position: "absolute",
            top: morePopupInfo.position.top,
            left: morePopupInfo.position.left,
          }}
        >
          <div className="more-popup-card">
            <div className="popup-header">
            📅{" "}
              {
                new Date(
                  new Date(morePopupInfo.date).setDate(
                    new Date(morePopupInfo.date).getDate() +1
                  )
                )
                  .toISOString()
                  .split("T")[0]
              }{" "}
              일정
            </div>
            <div className="popup-body">
              {morePopupInfo.events.map((event, idx) => (
                <div key={idx} className="popup-event">
                  {event.title}
                </div>
              ))}
            </div>
            <button
              className="popup-close-btn"
              onClick={() =>
                setMorePopupInfo({
                  isOpen: false,
                  date: null,
                  events: [],
                  position: { top: 0, left: 0 },
                })
              }
            >
              닫기
            </button>
          </div>
        </div>
      )}
 
      <Footer />
    </>
  );
};

export default CalendarPage;