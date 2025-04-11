import React, { useState, useEffect, useRef } from "react";
import { questionList } from "./data/question"; // 상대경로 맞게 수정
import { makeSurveyData } from "./utils/surveyMapper"; // 👈 핵심!
import "./questionwedding.css";
import MyMap from "./Map"; // 컴포넌트 import

const QuestionWedding = ({ onProgress, onComplete, hallDetails }) => {
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
  
    if (step === questionList.length) {
      const resultData = makeSurveyData(answers, questionList);
      
      setTimeout(() => {
        chatRef.current.scrollTo({
          top: chatRef.current.scrollHeight + 500, // 살짝 더 아래
          behavior: 'smooth',
        });
      }, 300);
      if (onComplete) {
        onComplete(resultData);
      }
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
      
      {hallDetails.length > 0 && (
        <div className="recommend-result">
          <h2>추천 예식장 3가지</h2>
          {hallDetails.map((hall, index) => (
            <div key={index} className="hall-card">
              <h3>{hall.whName}</h3>
              <p>주소: {hall.whAddr}</p>
              <p>전화번호: {hall.whTel}</p>
              <p>
                URL: <a href={hall.whUrl} target="_blank" rel="noopener noreferrer">{hall.whUrl}</a>
              </p>
              <div style={{ textAlign: "center" }}>
              {hall.whImg1 && (
                <img
                  src={hall.whImg1}
                  alt="웨딩홀 이미지1"
                  style={{ width: "300px", margin: "10px 0" }}
                />
              )}
              {hall.whImg2 && (
                <img
                  src={hall.whImg2}
                  alt="웨딩홀 이미지2"
                  style={{ width: "300px", margin: "10px 0" }}
                />
              )}
              {hall.whImg3 && (
                <img
                  src={hall.whImg3}
                  alt="웨딩홀 이미지3"
                  style={{ width: "300px", margin: "10px 0" }}
                />
              )}
              </div>
              <MyMap lat={hall.lat} lon={hall.lon} title={hall.whName} />
              

              {/* ✅ 가격 리스트 출력 */}
              {hall.prices && hall.prices.length > 0 && (
                <div className="price-section">
                  <h4>💰 상세 정보</h4>
                  {hall.prices.map((price, idx) => (
                    <div key={idx} className="price-card">
                      <p>홀 이름: {price.hallName}</p>
                      <p>시간대: {price.wedTime}</p>
                      <p>카테고리: {price.wedCategory}</p>
                      <p>대관료: {price.rentalFee.toLocaleString()}원</p>
                      <p>기본 인원: {price.basicCnt}명</p>
                      <p>식대: {price.foodPrice.toLocaleString()}원</p><br />
                    </div>
                  ))}
                </div>
              )}
              <p>주차 가능 대수: {hall.carParkCt}대</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default QuestionWedding;
