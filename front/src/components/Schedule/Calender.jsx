import React, { useState, useEffect,useRef} from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import ko from "date-fns/locale/ko";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendermain.css"
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

  // 🔹 일정 추가
  const handleAddEvent = async () => {
    console.log("➕ 추가 시도 - title:", newTitle, "date:", newDate);

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
      console.error("일정 추가 실패:", err);
    }
  };

  // 🔹 일정 수정
  const handleUpdateEvent = async () => {
    console.log("✏️ 수정 시도 - title:", newTitle, "date:", newDate);
    if (!selectedEvent?.scheIdx) return;

    const eventData = {
      scheTitle: newTitle,
      scheduleDate: newDate,
      scheStatus: isCompleted ? "완료" : "예정",
      scheCategory: category,
    };
    // 확인한 값을 다시 로그로 출력
    console.log("🟢 이벤트 데이터:", eventData);

    try {
      await updateSchedule(selectedEvent.scheIdx, eventData);
      resetForm();
      fetchEvents();
    } catch (err) {
      console.error("일정 수정 실패:", err);
    }
  };
  const handleDeleteEvent = async () => {
    if (!selectedEvent?.scheIdx) return;

    try {
      await deleteSchedule(selectedEvent.scheIdx);
      resetForm();
      fetchEvents();
    } catch (err) {
      console.error("일정 삭제 실패:", err);
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
        color: item.scheStatus === "완료" ? "#ff1493" : "#EFA1DC",
        scheIdx: item.scheIdx,
      }));
      setEvents(formatted);
    } catch (err) {
      console.error("일정 조회 실패:", err);
    }
  };

  const handleAddEventModal = () => {
    setSelectedEvent(null);
    setNewTitle("");
    setNewDate(new Date().toISOString().split("T")[0]);
    setCategory("custom");
    setIsCompleted(false);
    setIsModalOpen(true);
  };
  useEffect(() => {
    const checkWeddingDate = async () => {
      try {
        const existingWeddingDate = await getWeddingDate();
        if (!existingWeddingDate) {
          setShowWeddingModal(true);
        }
      } catch (err) {
        console.error("결혼식 날짜 조회 실패:", err);
        setAlertMessage("결혼식 날짜 조회에 실패했습니다.");
        setIsAlertVisible(true);
      }
    };

    checkWeddingDate();
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchSharedEvents = async () => {
      const token = sessionStorage.getItem("token");
  
      try {
        const response = await fetch("http://localhost:8081/boot/api/schedule/events/shared", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("📦 공유 일정 받아옴:", data);
  
          const formattedShared = data.map((item) => ({
            title: item.scheTitle + " (공유)",
            start: new Date(item.scheduleDate),
            end: new Date(item.scheduleDate),
            color: "#7C83FD", // 공유 일정은 보라색 계열로
            scheIdx: item.scheIdx,
            isShared: true,
          }));
  
          // 기존의 공유 일정 제거하고 새로운 걸 추가
          setEvents((prev) => [
            ...prev.filter((e) => !e.isShared),
            ...formattedShared,
          ]);
        } else {
          console.error("❌ 공유 일정 불러오기 실패:", response.status);
        }
      } catch (err) {
        console.error("❌ 공유 일정 fetch 오류:", err);
      }
    };
  
    fetchSharedEvents();
  }, []);
  

  return (
    <>
      <Header />
      <div className="title-wrap">
        <h1 className="maintitle">일정관리</h1>
        <HandleInvite />
      </div>
      <hr className="custom-line" />
      <div className="calendar-main">
        <div className="calendar-main-container">
          <div className="calendar-main-box">
            <div className="calendar-main-wrapper">
              <Calendar
                date={currentDate}
                onNavigate={(date) => setCurrentDate(date)}
                view="month"
                localizer={localizer}
                events={events}
                components={{ toolbar: CustomToolbar }}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={(slotInfo) => {
                  setNewDate(slotInfo.start.toISOString().split("T")[0]);
                  setNewEndDate(slotInfo.end.toISOString().split("T")[0]);
                  setSelectedEvent(null);
                  setIsModalOpen(true);
                }}
                onSelectEvent={(event) => {
                  setSelectedEvent(event);
                  setNewTitle(event.title);
                  setNewDate(event.start.toISOString().substring(0, 10));
                  setNewEndDate(event.end.toISOString().substring(0, 10));
                  setIsCompleted(event.color === "#ff1493");
                  setIsModalOpen(true);
                }}
                eventPropGetter={(event) => {
                  const isHighlighted =
                    highlightedDate === event.start.toISOString().split("T")[0];

                  return {
                    style: {
                      backgroundColor: isHighlighted
                        ? "#ff6347"
                        : event.color || "#EFA1DC",
                      borderRadius: "8px",
                      color: "white",
                      padding: "2px 5px",
                      transition: "all 0.3s ease-in-out",
                      transform: isHighlighted ? "scale(1.05)" : "scale(1)",
                      boxShadow: isHighlighted ? "0 0 10px #ff6347" : "none",
                    },
                  };
                }}
                dayPropGetter={(date) => {
                  const isSameDate =
                    highlightedDate &&
                    new Date(highlightedDate).toDateString() ===
                      date.toDateString();

                  return {
                    className: isSameDate ? "highlight-day" : "",
                  };
                }}
                style={{ height: 750 }}
              />
            </div>
          </div>

          <div className="calendar-main-side">
            {/* WeddingAccordion 컴포넌트 추가 */}
            {
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
                }} // 일정 추가 버튼의 기능
              />
            }
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
          category={category} // ✅ 여기 추가
          setCategory={setCategory} // ✅ 여기 추가
        />

        {showWeddingModal && (
          <WeddingDateModal
            weddingDate={weddingDateInput}
            setWeddingDate={setWeddingDateInput}
            onSuccess={(savedDate) => {
              setShowWeddingModal(false); // ✅ 모달만 닫기
            }}
          />
        )}

        {/* 결혼식 날짜가 있으면 템플릿 자동 저장
         */}
        {weddingDate && (
          <WeddingTemplateAutoSaver
            weddingDate={weddingDate}
            onSaved={fetchEvents}
          />
        )}

        {isAlertVisible && (
          <CustomAlert message={alertMessage} onClose={handleCloseAlert} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default CalendarPage;
