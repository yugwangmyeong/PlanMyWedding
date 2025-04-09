import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import ko from "date-fns/locale/ko";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/calendermain.css";
import Header from "../Header";
import Footer from "../Footer";
import CustomToolbar from "./utils/CustomToolbar";
import WeddingDateModal from "./utils/WeddingDateModal";
import useWeddingDate from "./utils/useWeddingDate";
import EventModal from "./EventModal";
import { getWeddingDate } from './utils/WeddingApi';
import CustomAlert from "../Customalert";
const locales = { ko };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const [showWeddingModal, setShowWeddingModal] = useState(false);
  const [weddingDateInput, setWeddingDateInput] = useState("");
  const { weddingDate, isLoaded, hasWeddingDate } = useWeddingDate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const [openCategory, setOpenCategory] = useState(null);

  const [weddingItems, setWeddingItems] = useState([
    {
      category: "준비 목록",
      items: [{ title: "웨딩홀 투어", completed: false }],
    },
    {
      category: "필수 일정",
      items: [{ title: "청첩장 제작", completed: true }],
    },
  ]);


  // 알림 닫기 함수
  const handleCloseAlert = () => {
    setIsAlertVisible(false);  // 알림 닫기
  };
  
  // 📌 일정 템플릿 생성 함수
  const generateWeddingTemplate = (dateStr) => {
    const wedding = new Date(dateStr);
    const today = new Date();
    const totalDays = Math.ceil((wedding - today) / (1000 * 60 * 60 * 24));

    const ratioTasks = [
      { title: "웨딩홀 투어", ratio: 0.1 },
      { title: "스드메 상담", ratio: 0.25 },
      { title: "청첩장 제작", ratio: 0.5 },
      { title: "예복/한복 맞춤", ratio: 0.7 },
      { title: "신혼여행 예약", ratio: 0.85 },
    ];

    const ratioEvents = ratioTasks.map(({ title, ratio }) => {
      const offsetDays = Math.floor(totalDays * (1 - ratio));
      const target = new Date(wedding);
      target.setDate(wedding.getDate() - offsetDays);
      return {
        title,
        start: target,
        end: target,
        color: "#EFA1DC",
      };
    });

    const fixedOffsets = [
      { title: "식순 회의", offset: -30 },
      { title: "최종 리허설", offset: -7 },
      { title: "결혼식 당일", offset: 0 },
      { title: "허니문 출발", offset: 1 },
      { title: "혼인신고", offset: 7 },
    ];

    const fixedEvents = fixedOffsets.map(({ title, offset }) => {
      const target = new Date(wedding);
      target.setDate(wedding.getDate() + offset);
      return {
        title,
        start: target,
        end: target,
        color: "#EFA1DC",
      };
    });

    return [...ratioEvents, ...fixedEvents];
  };

  const toggleCategory = (category) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  const handleCheckboxToggle = (category, title) => {
    setWeddingItems((prev) =>
      prev.map((section) =>
        section.category === category
          ? {
              ...section,
              items: section.items.map((item) =>
                item.title === title
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            }
          : section
      )
    );
  };
  const handleAddOrUpdateEvent = () => {
    const newEvent = {
      title: newTitle,
      start: new Date(newDate),
      end: new Date(newEndDate),
      color: isCompleted ? "#ff1493" : "#EFA1DC",
    };

    if (selectedEvent) {
      // 수정
      setEvents(
        events.map((event) => (event === selectedEvent ? newEvent : event))
      );
    } else {
      // 추가
      setEvents([...events, newEvent]);
    }
    resetForm();
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent) return;
    setEvents(events.filter((event) => event !== selectedEvent));
    resetForm();
  };

  const resetForm = () => {
    setSelectedEvent(null);
    setNewTitle("");
    setNewDate("");
    setNewEndDate("");
    setIsCompleted(false);
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchWeddingDate = async () => {
      try {
        const existingWeddingDate = await getWeddingDate();
        if (existingWeddingDate) {
          // 이미 결혼식 날짜가 등록되어 있으면 모달을 띄우지 않음
          setAlertMessage("이미 결혼식 날짜가 등록되어 있습니다!");
          setIsAlertVisible(true);  // 알림 표시
          setShowWeddingModal(false); // 모달을 숨김
        } else {
          // 결혼식 날짜가 없으면 모달을 띄움
          setShowWeddingModal(true);
        }
      } catch (err) {
        console.error("결혼식 날짜 조회 실패:", err);
        setAlertMessage("결혼식 날짜 조회에 실패했습니다.");
        setIsAlertVisible(true);  // 알림 표시
      }
    };

    fetchWeddingDate();
  }, []); // 페이지가 로드될 때 한 번만 실행
  return (
    <>
      <Header />
      <div className="title-wrap">
        <h1 className="maintitle">일정관리</h1>
        <button className="invite-btn">+ 초대하기</button>
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
                onView={setCurrentView}
                localizer={localizer}
                events={events}
                components={{ toolbar: CustomToolbar }}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={(slotInfo) => {
                  setNewDate(slotInfo.start.toISOString().substring(0, 10));
                  setNewEndDate(slotInfo.end.toISOString().substring(0, 10));
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
                eventPropGetter={(event) => ({
                  style: {
                    backgroundColor: event.color || "#EFA1DC",
                    borderRadius: "8px",
                    color: "white",
                    padding: "2px 5px",
                  },
                })}
                style={{ height: 750 }}
              />
            </div>
          </div>

          <div className="calendar-main-side">
            <div className="sides-box">
              <button
                className="sides-card pinks"
                onClick={() => {
                  setIsModalOpen(true)
                }}
              >
                일정 추가
              </button>

              <div className="sides-card blues">
                일정 진행도 D-365
                <br />
                <progress className="progress" value="50" min="0" max="100" />
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
        </div>

        {/* 일정 추가/수정 모달 */}
        <EventModal
          isModalOpen={isModalOpen} // 모달이 열렸는지 여부
          selectedEvent={selectedEvent} // 수정할 이벤트가 있는지 여부
          newTitle={newTitle} // 새 제목
          newDate={newDate} // 새 시작 날짜
          newEndDate={newEndDate} // 새 종료 날짜
          isCompleted={isCompleted} // 완료 여부
          setNewTitle={setNewTitle} // 제목 설정 함수
          setNewDate={setNewDate} // 시작 날짜 설정 함수
          setNewEndDate={setNewEndDate} // 종료 날짜 설정 함수
          setIsCompleted={setIsCompleted} // 완료 여부 설정 함수
          handleAddOrUpdateEvent={handleAddOrUpdateEvent} // 일정 추가/수정 함수
          handleDeleteEvent={handleDeleteEvent} // 일정 삭제 함수
          resetForm={resetForm} // 폼 리셋 함수
        />

        {/* 결혼일자 입력 팝업 */}
        {showWeddingModal && (
          <WeddingDateModal
            weddingDate={weddingDateInput}
            setWeddingDate={setWeddingDateInput}
            onSuccess={(savedDate) => {
              const templateEvents = generateWeddingTemplate(savedDate);
              setEvents(templateEvents);
              setShowWeddingModal(false);
            }}
          />
        )}

        {/* 알림이 표시될 때 CustomAlert 렌더링 */}
      {isAlertVisible && (
        <CustomAlert message={alertMessage} onClose={handleCloseAlert} />
      )}
        
      </div>
      <Footer />
    </>
  );
};

export default CalendarPage;
