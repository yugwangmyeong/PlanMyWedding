// WeddingAccordion.jsx
import React, { useState, useEffect } from "react";

const WeddingAccordion = ({ weddingDate, onAddEvent }) => {
  const [openCategory, setOpenCategory] = useState(null);
  const [weddingItems, setWeddingItems] = useState([]);
  const [daysLeft, setDaysLeft] = useState(0);
  const [progress, setProgress] = useState(0);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const handleCheckboxToggle = (category, title) => {
    setWeddingItems((prevItems) =>
      prevItems.map((item) =>
        item.category === category
          ? {
              ...item,
              items: item.items.map((i) =>
                i.title === title ? { ...i, completed: !i.completed } : i
              ),
            }
          : item
      )
    );
  };

  // 템플릿 기반 아코디언 항목 생성 함수
  const generateWeddingTemplateForAccordion = (event) => {
    try {
      // '2025-07-17' 형식의 문자열을 Date 객체로 변환하기
      const weddingDateStr = event?.reservedAt;
      const weddingDate = new Date(weddingDateStr + "T00:00:00"); // 날짜에 시간 부분을 추가하여 제대로 파싱되도록 함

      // 날짜가 유효하지 않으면 빈 배열을 반환
      if (isNaN(weddingDate.getTime())) {
        console.error("유효하지 않은 날짜:", weddingDateStr);
        return [];
      }

      // 현재부터 결혼식까지의 기간을 일수로 계산
      const today = new Date();
      const totalDays = Math.ceil(
        (weddingDate - today) / (1000 * 60 * 60 * 24)
      );

      console.log("Wedding Date:", weddingDate);
      console.log("Days until wedding:", totalDays);

      // 카테고리 분류
      const preparationItems = [
        { title: "웨딩홀 투어", completed: false },
        { title: "스드메 상담", completed: false },
        { title: "청첩장 제작", completed: false },
        { title: "예복/한복 맞춤", completed: false },
        { title: "신혼여행 예약", completed: false },
      ];

      const essentialItems = [
        { title: "식순 회의", completed: false },
        { title: "최종 리허설", completed: false },
        { title: "결혼식 당일", completed: false },
        { title: "허니문 출발", completed: false },
        { title: "혼인신고", completed: false },
      ];

      const otherItems = [
        { title: "양가 상견례", completed: false },
        { title: "혼수 준비", completed: false },
        { title: "웨딩 촬영", completed: false },
        { title: "신혼집 계약", completed: false },
      ];

      // 결혼식 날짜를 포맷팅하여 표시
      const weddingDateFormatted = weddingDate.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return [
        {
          category: "예정 일정",
          items: [
            { title: `결혼식: ${weddingDateFormatted}`, completed: false },
          ],
        },
        {
          category: "준비 목록",
          items: preparationItems,
        },
        {
          category: "필수 일정",
          items: essentialItems,
        },
        {
          category: "기타 준비",
          items: otherItems,
        },
      ];
    } catch (error) {
      console.error("Error in generateWeddingTemplateForAccordion:", error);
      return [];
    }
  };

  // 결혼식 날짜가 변경될 때 아코디언 항목 업데이트
  useEffect(() => {
    if (weddingDate) {
      // 아코디언 항목 생성 및 설정
      const accordionItems = generateWeddingTemplateForAccordion(weddingDate);
      setWeddingItems(accordionItems);

      // 기본적으로 첫 번째 카테고리를 열어둠
      if (accordionItems.length > 0) {
        setOpenCategory(accordionItems[0].category);
      }

      // D-day 계산
      const today = new Date();
      const weddingDay = new Date(weddingDate);
      const daysDiff = Math.ceil((weddingDay - today) / (1000 * 60 * 60 * 24));
      setDaysLeft(daysDiff);

      // 진행도 계산 (최대 1년 기준)
      const progressValue = Math.min(
        100,
        Math.max(0, 100 - (daysDiff / 365) * 100)
      );
      setProgress(progressValue);
    }
  }, [weddingDate]);

  // 일정 추가 모달 열기 함수
  const openAddEventModal = () => {
    if (typeof onAddEvent === "function") {
      onAddEvent();
    }
  };

  return (
    <div className="calendar-main-side">
      <div className="sides-box">
        <button className="sides-card pinks" onClick={openAddEventModal}>
          일정 추가
        </button>

        <div className="sides-card blues">
          일정 진행도 {weddingDate ? `D-${daysLeft}` : "D-day 미설정"}
          <br />
          <progress className="progress" value={progress} min="0" max="100" />
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
                      <li key={item.title} className="flex items-center gap-2">
                        <span
                          className={
                            item.completed ? "line-through text-gray-400" : ""
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
  );
};

export default WeddingAccordion;
