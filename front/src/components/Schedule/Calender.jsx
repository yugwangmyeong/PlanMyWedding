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
import { getWeddingDate } from "./utils/WeddingApi";
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

  

  // 알림 닫기 함수
  const handleCloseAlert = () => {
    setIsAlertVisible(false); // 알림 닫기
  };

  
  // 일정 추가/수정 함수
  const handleAddOrUpdateEvent = () => {
    if (!newTitle || !newDate) {
      setAlertMessage("제목과 날짜를 입력해주세요!");
      setIsAlertVisible(true);
      return;
    }

    const eventToAdd = {
      title: newTitle,
      start: new Date(newDate),
      end: new Date(newEndDate || newDate),
      color: isCompleted ? "#ff1493" : "#EFA1DC",
    };

    if (selectedEvent) {
      // 기존 이벤트 업데이트
      setEvents(
        events.map((event) => (event === selectedEvent ? eventToAdd : event))
      );
    } else {
      // 새 이벤트 추가
      setEvents([...events, eventToAdd]);
    }

    resetForm();
  };
  // 일정 삭제 함수
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter((event) => event !== selectedEvent));
      resetForm();
    }
  };

  // 폼 리셋 함수
  const resetForm = () => {
    setSelectedEvent(null);
    setNewTitle("");
    setNewDate("");
    setNewEndDate("");
    setIsCompleted(false);
    setIsModalOpen(false);
  };

  // 📌 일정 템플릿 생성 함수
  const generateWeddingTemplate = (dateStr) => {
    try {
      // '2025-07-17' 형식의 문자열을 Date 객체로 변환하기
      const wedding = new Date(dateStr + "T00:00:00");
  
      // 유효한 날짜인지 체크
      if (isNaN(wedding)) {
        console.error("유효하지 않은 날짜:", dateStr);
        return []; // 유효하지 않으면 빈 배열 반환
      }
  
      const today = new Date();
      const totalDays = Math.ceil((wedding - today) / (1000 * 60 * 60 * 24));
  
      console.log("Wedding Date:", wedding);
      console.log("Days until wedding:", totalDays);
  
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
        console.log(`Event: ${title}, Date: ${target}`);
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
        console.log(`Event: ${title}, Date: ${target}`);
        return {
          title,
          start: target,
          end: target,
          color: "#EFA1DC",
        };
      });
  
      return [...ratioEvents, ...fixedEvents];
    } catch (error) {
      console.error("Error in generateWeddingTemplate:", error);
      return []; // 오류 발생 시 빈 배열 반환
    }
  };
  

  // 웨딩 데이터 불러오기
  useEffect(() => {
    console.log("Fetching wedding date...");
    const fetchWeddingDate = async () => {
      try {
        const existingWeddingDate = await getWeddingDate();
        if (existingWeddingDate?.reservedAt) {
          // 이미 결혼식 날짜가 등록되어 있으면 템플릿 생성
          setAlertMessage("이미 결혼식 날짜가 등록되어 있습니다!");
          setIsAlertVisible(true);
          setShowWeddingModal(false);
  
          // 템플릿 이벤트 생성
          const templateEvents = generateWeddingTemplate(existingWeddingDate.reservedAt);
          setEvents(templateEvents);
        } else {
          // 결혼식 날짜가 없으면 모달을 띄움
          setShowWeddingModal(true);
        }
      } catch (err) {
        console.error("결혼식 날짜 조회 실패:", err);
        setAlertMessage("결혼식 날짜 조회에 실패했습니다.");
        setIsAlertVisible(true);
      }
    };
  
    fetchWeddingDate();
  }, []);
  

  // useWeddingDate 훅에서 가져온 데이터를 기반으로 템플릿 생성
  useEffect(() => {
    if (hasWeddingDate && weddingDate && isLoaded) {
      const templateEvents = generateWeddingTemplate(weddingDate);
      setEvents(templateEvents);
    }
  }, [weddingDate, hasWeddingDate, isLoaded]);

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
          </div>
         

          

        {/* 일정 추가/수정 모달 */}
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
          handleAddOrUpdateEvent={handleAddOrUpdateEvent}
          handleDeleteEvent={handleDeleteEvent}
          resetForm={resetForm}
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