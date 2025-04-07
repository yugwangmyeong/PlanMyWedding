import React, { useState, useEffect, useRef } from "react";
import { questionList } from "./data/question";
import "./questionwedding.css";

const QuestionWedding = ({ onProgress }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [fadeOut, setFadeOut] = useState(false);
  const current = questionList[step];
  const [showNext, setShowNext] = useState(true);
  const chatRef = useRef(null);

  const handleSelect = (option) => {
    if (!current) return; // 혹시 모를 클릭 차단

    const answered = {
      question: current.question,
      answer: option,
    };

    setAnswers((prev) => [...prev, answered]);
    setFadeOut(true); // ✅ fade-out 시작
    setShowNext(false); // 👉 다음 질문 숨김 상태로

    // 👉 잠깐 멈춘 뒤 다음 질문 보여주기
    setTimeout(() => {
      setFadeOut(false); // ✅ fade-out 종료
      setStep((prev) => prev + 1);
      setShowNext(true);
    }, 1200); // 딜레이 600ms (자연스럽게)
  };

  //step에 맞게 scroll이 자동으로 내려가도록해야함
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
    // 진행률 계산 후 부모에 전달
    const percent = Math.round((step / questionList.length) * 100);
    onProgress(percent);
  }, [answers.length, step]);
  return (
    <div className="chat-wrapper" ref={chatRef}>
      {answers.map((a, idx) => (
        <div key={idx} className="answer-group fade-in">
          <div className="chat-bubble question">{a.question}</div>
          <div className="chat-bubble answer">{a.answer}</div>
        </div>
      ))}

      {/* 현재 질문 + 보기 출력 */}
      {showNext && current && (
        <div className="question-card fade-in">
          <div className="chat-bubble question">{current.question}</div>
          <div className="option-list">
            {current.options.map((opt, idx) => (
              <label
                key={idx}
                className="option-box fade-in"
                onClick={() => handleSelect(opt)}
              >
                <input type="checkbox" tabIndex={-1} disabled />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 모든 질문 완료 시 */}
      {!current && (
        <div className="recommend-done">🎉 추천이 완료되었습니다!</div>
      )}
    </div>
  );
};

export default QuestionWedding;
