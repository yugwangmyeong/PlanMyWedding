import React, { useState } from "react";
import Header from "../Header";
import "./recwedding.css";
import { questionList } from "./data/question";
import QuestionWedding from "./QuestionWedding";
const RecWedding = () => {
  const [progress, setProgress] = useState(0); // ✅ progress 상태
  const totalSteps = questionList.length;

  return (
    <div>
      <Header></Header>
      
      <div className="progressbar-wrapper">
        <h1 className="maintitle">웨딩홀</h1>
        <div className="progress-bar-wrapper">
          <span className="progress-text">{progress}</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="recommend-layout">
        <QuestionWedding onProgress={setProgress} />
      </div>
    </div>
  );
};

export default RecWedding;
