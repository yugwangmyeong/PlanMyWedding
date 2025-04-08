import React, { useState } from "react";
import Header from "../Header";
import "./recwedding.css";
import { questionList } from "./data/question";
import QuestionWedding from "./QuestionWedding";

const RecWedding = () => {
  const [progress, setProgress] = useState(0);
  const [hallDetails, setHallDetails] = useState([]);
  const totalSteps = questionList.length;

  const handleSurveyComplete = async (data) => {
    console.log("✅ 설문 완료, 서버에 전송할 데이터:", data);

    try {
      const res = await fetch("/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();
        console.log("🎯 서버 응답 결과:", result);
      
        // ✅ TOP 3 예식장 이름만 추출
        const top3Names = result.recommendations.slice(0, 3).map(item => item.예식장);
        console.log("🔥 TOP 3 예식장 이름:", top3Names);
      
        // ✅ Spring Boot 서버에 상세 정보 요청
        const detailRes = await fetch("http://localhost:8080/wedding-halls/details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hallNames: top3Names }),
        });
      
        if (detailRes.ok) {
          const hallDetails = await detailRes.json();
          console.log("🏛️ 상세 정보:", hallDetails);
      
          // 👉 상태 업데이트 등 여기서 처리 (예: setHallDetails(hallDetails))
          setHallDetails(hallDetails);
        } else {
          console.error("❌ Spring Boot 요청 실패:", detailRes.status);
        }
      }
    } catch (err) {
      console.error("🚨 네트워크 오류:", err);
    }
  };

  return (
    <div>
      <Header />
      <hr />
      <div className="progressbar-wrapper">
        <h1 className="maintitle">광주 웨딩홀</h1>
        <div className="progress-bar-wrapper">
          <span className="progress-text">{progress}</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="recommend-layout">
      <QuestionWedding
        onProgress={setProgress}
        onComplete={handleSurveyComplete}
      />
      </div>
      
      {hallDetails.length > 0 && (
        <div className="recommend-result">
          <h2>추천 예식장 상세 정보</h2>
          {hallDetails.map((hall, index) => (
            <div key={index} className="hall-card">
              <h3>{hall.whName}</h3>
              <p>📍 주소: {hall.whAddr}</p>
              <p>📞 전화번호: {hall.whTel}</p>
              <p>🔗 URL: <a href={hall.whUrl} target="_blank" rel="noopener noreferrer">{hall.whUrl}</a></p>
              <img src={hall.whImg1} alt="웨딩홀 이미지1" style={{ width: "200px", margin: "10px 0" }} />
              {/* 필요하면 whImg2, whImg3 도 추가 가능 */}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default RecWedding;
