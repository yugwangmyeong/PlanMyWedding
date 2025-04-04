import React from "react";
import Header from "../Header";
import "./recwedding.css";
import QuestionWedding from "./QuestionWedding";
const RecWedding = () => {
  return (
    <div>
      <Header></Header>

      <div className="recommend-layout">
        <div className="progressbar-wrapper">
          <h1 className="maintitle">웨딩홀</h1>
          <div className="progress-bar-wrapper">
            <span className="progress-text">30%</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "30%" }}></div>
            </div>
          </div>
        </div>

        <QuestionWedding></QuestionWedding>
      </div>
    </div>
  );
};

export default RecWedding;
