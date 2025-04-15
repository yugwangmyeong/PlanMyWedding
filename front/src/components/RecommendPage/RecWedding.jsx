import React, { useState } from "react";
import Header from "../Header";
import "./recwedding.css";
import { questionList } from "./data/question";
import QuestionWedding from "./QuestionWedding";
import Footer from "../Footer"


const RecWedding = () => {
  const [progress, setProgress] = useState(0);
  const [hallDetails, setHallDetails] = useState([]);
  const totalSteps = questionList.length;

  const handleSurveyComplete = async (data) => {
    
    setHallDetails([]); // 기존 추천 결과 초기화
  
    try {
      // 1. 파이썬 Render 서버에 추천 요청
      const res = await fetch("/recommend", { // 실제 Render URL로 변경
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (!res.ok) {
        //throw new Error(`추천 서버 응답 오류: ${res.status}`);
      }
  
      const result = await res.json();
      
    
      if (!result.recommendations || result.recommendations.length === 0) {
        //throw new Error("추천 결과가 없습니다");
      }
    
      // 유사도 TOP 3 예식장 이름 추출
      const top3Names = result.recommendations.slice(0, 3).map(item => item.예식장);
      
    
      try {
        // 2. Spring Boot 서버에 상세 정보 요청
        const detailRes = await fetch("/wedding-halls/details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hallNames: top3Names }),
        });
      
        if (!detailRes.ok) {
          //throw new Error(`상세 정보 서버 응답 오류: ${detailRes.status}`);
        }
      
        const hallDetails = await detailRes.json();
        
      
        // 상세 정보 업데이트
        setHallDetails(hallDetails);
      } catch (detailErr) {
        //console.error("상세 정보 요청 오류:", detailErr);
        // 기본 정보만이라도 보여주기
        setHallDetails(result.recommendations.slice(0, 3).map(hall => ({
          whName: hall.예식장,
          whAddr: "상세 정보를 불러오지 못했습니다",
          whTel: "-",
          whUrl: "-",
          whImg1: null
        })));
      }
    } catch (err) {
      //console.error(" 네트워크 오류:", err);
      alert("추천 서비스 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <Header />
      <hr />
      <div className="progressbar-wrapper">
        <h1 className="maintitle">광주 웨딩홀</h1>
        <div className="progress-bar-wrapper">
      
          <div className="progress-bar">
            <div className="progress-fill" style={{ width:`${progress}%` }}></div>
          </div>
          <span className="progress-text">{progress}%</span>
        </div>
      </div>

      <div className="recommend-layout">
      <QuestionWedding
        onProgress={setProgress}
        onComplete={handleSurveyComplete}
        hallDetails={hallDetails}
      />
      </div>
    <Footer />
    </div>
  );
};

export default RecWedding;
