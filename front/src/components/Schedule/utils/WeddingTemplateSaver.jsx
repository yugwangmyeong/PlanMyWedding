import { useEffect, useRef  } from "react";
import { saveWeddingTemplate, checkIfTemplateExists } from "./WeddingApi";

const WeddingTemplateAutoSaver = ({ weddingDate, onSaved }) => {
  const isSavedRef = useRef(false);
  useEffect(() => {
    if (!weddingDate || isSavedRef.current) return;

    const generateAndSaveTemplates = async () => {
      try {
        const exists = await checkIfTemplateExists();
        if (exists) {
          //console.log("⛔ 이미 웨딩 템플릿이 존재하여 저장하지 않음");
          return;
        }

        const wedding = new Date(weddingDate + "T00:00:00");
        const today = new Date();
        const totalDays = Math.ceil((wedding - today) / (1000 * 60 * 60 * 24));

        const ratioTasks = [
          { title: "웨딩홀 투어", ratio: 0.1 },
          { title: "스드메 상담", ratio: 0.25 },
          { title: "웨딩스튜디오 촬영일 예약", ratio: 0.3 }, // ✅ 추가
          { title: "청첩장 제작", ratio: 0.5 },
          { title: "청첩장 발송", ratio: 0.55 },  // ✅ 추가
          { title: "예복/한복 맞춤", ratio: 0.7 },
          { title: "신혼여행 예약", ratio: 0.60 },
        ];

        const fixedOffsets = [
          { title: "식순 회의", offset: -30 },
          { title: "최종 리허설", offset: -7 },
          { title: "신혼 여행", offset: 1 },
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

        for (const event of templates) {
          await saveWeddingTemplate(event);
        }

        if (onSaved) onSaved();
        //console.log("✅ 웨딩 템플릿 자동 생성 및 저장 완료");

          // 성공적으로 저장된 후에 flag 업데이트
        isSavedRef.current = true;
      } catch (err) {
        //console.error("❌ 템플릿 저장 실패:", err);
      }
    };

    generateAndSaveTemplates();
  }, [weddingDate]);

  return null;
};

export default WeddingTemplateAutoSaver;
