import React, { useState, useEffect, useRef } from "react";
import { questionList } from "./data/question"; // 상대경로 맞게 수정
import { makeSurveyData } from "./utils/surveyMapper"; // 👈 핵심!
import "./questionwedding.css";


const QuestionWedding = ({ onProgress, onComplete  }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [fadeOut, setFadeOut] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const chatRef = useRef(null);
  const current = questionList[step];

  const handleSelect = (option) => {
    if (!current) return;

    const answered = {
      question: current.question,
      answer: option,
    };

    setAnswers((prev) => [...prev, answered]);
    setFadeOut(true);
    setShowNext(false);

    setTimeout(() => {
      setFadeOut(false);
      setStep((prev) => prev + 1);
      setShowNext(true);
    }, 1200);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }

    const percent = Math.round((step / questionList.length) * 100);
    onProgress(percent);

    // 질문이 끝났을 때 data 만들기
    if (step === questionList.length && onComplete) {
      const resultData = makeSurveyData(answers);
      console.log("✅ 최종 전송할 data:", resultData);
      onComplete(resultData); // 부모 컴포넌트로 전달!
    }
  }, [answers.length, step]); 

  return (
    <div className="chat-wrapper" ref={chatRef}>
      {answers.map((a, idx) => (
        <div key={idx} className="answer-group fade-in">
          <div className="chat-bubble question">{a.question}</div>
          <div className="chat-bubble answer">{a.answer}</div>
        </div>
      ))}

      {showNext && current && (
        <div className="question-card fade-in">
          <div className="chat-bubble question">{current.question}</div>

          {current.question.includes("떠오르는 키워드") && (
            <div className="subjective-input">
              <input
                type="text"
                placeholder="예: 고급스러움, 넓은 홀, 자연광"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim() !== "") {
                    handleSelect(e.target.value.trim());
                    e.target.value = "";
                  }
                }}
              />
              <p className="tip-text">키워드를 입력하고 Enter를 눌러주세요.</p>
            </div>
          )}

          {current.question.includes("중요하게 생각하는지") && (
            <div className="option-list-10">
              <div className="worst">Worst</div>
              {current.options.map((opt, idx) => (
                <label key={idx} className="option-box-10">
                  <input
                    type="radio"
                    name={`question-${current.id}`}
                    value={opt}
                    onClick={() => handleSelect(opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
              <div className="best">Best</div>
            </div>
          )}

          {!current.question.includes("중요하게 생각하는지") &&
            current.question !== "예식장 하면 떠오르는 키워드를 작성해 주세요." && (
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
            )}
        </div>
      )}
      
      {!current && <div className="recommend-done">🎉 추천이 완료되었습니다!</div>}
      
    </div>
    
  );
};



  


export default QuestionWedding;