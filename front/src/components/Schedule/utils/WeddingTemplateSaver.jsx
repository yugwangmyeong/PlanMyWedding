import { useEffect, useRef } from "react";
import { saveWeddingTemplate } from "./WeddingApi";

const WeddingTemplateAutoSaver = ({ weddingDate, onSaved }) => {
    const isSavedRef = useRef(false);
  
    useEffect(() => {
      if (!weddingDate || isSavedRef.current) return;
  
      // ✅ 저장 시작 전에 중복 저장 방지
      isSavedRef.current = true;
  
      const generateAndSaveTemplates = async () => {
        const wedding = new Date(weddingDate + "T00:00:00");
        if (isNaN(wedding)) {
          console.error("⛔ 유효하지 않은 날짜입니다:", weddingDate);
          return;
        }
  
        const today = new Date();
        const totalDays = Math.ceil((wedding - today) / (1000 * 60 * 60 * 24));
  
        const ratioTasks = [
          { title: "웨딩홀 투어", ratio: 0.1 },
          { title: "스드메 상담", ratio: 0.25 },
          { title: "청첩장 제작", ratio: 0.5 },
          { title: "예복/한복 맞춤", ratio: 0.7 },
          { title: "신혼여행 예약", ratio: 0.85 },
        ];
  
        const fixedOffsets = [
          { title: "식순 회의", offset: -30 },
          { title: "최종 리허설", offset: -7 },
          { title: "결혼식 당일", offset: 0 },
          { title: "허니문 출발", offset: 1 },
          { title: "혼인신고", offset: 7 },
        ];
  
        const templates = [
          ...ratioTasks.map(({ title, ratio }) => {
            const date = new Date(wedding);
            date.setDate(date.getDate() - Math.floor(totalDays * (1 - ratio)));
            return {
              scheduleDate: date.toISOString().split("T")[0],
              scheTitle: title,
              scheCategory: "weddingTemplate",
              scheStatus: "예정",
            };
          }),
          ...fixedOffsets.map(({ title, offset }) => {
            const date = new Date(wedding);
            date.setDate(date.getDate() + offset);
            return {
              scheduleDate: date.toISOString().split("T")[0],
              scheTitle: title,
              scheCategory: "weddingTemplate",
              scheStatus: "예정",
            };
          }),
        ];
  
        try {
          console.log("🔁 템플릿 생성 시작 (총", templates.length, "개)");
          for (const event of templates) {
            await saveWeddingTemplate(event);
          }
          if (onSaved) onSaved();
          console.log("✅ 웨딩 템플릿 자동 생성 및 저장 완료");
        } catch (err) {
          console.error("❌ 템플릿 저장 실패:", err);
        }
      };
  
      generateAndSaveTemplates();
    }, [weddingDate]); // ⛔ onSaved는 제외
  
    return null;
  };
  
  export default WeddingTemplateAutoSaver;