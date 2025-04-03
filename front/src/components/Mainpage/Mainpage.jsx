import React from "react";
import Header from "../Header";
import MiniRoomSection from "./MiniRoomSection";
import BudgetSection from "./BudgetSection";
import ScheduleSection from "./ScheduleSection";
import "../styles/mainpage.css";
const Mainpage = () => {
  return (
    <div>
      <Header></Header> 
      
      <hr className="custom-line" />
      <div className="main-wrapper">
        {/* 이미 위쪽 헤더/로고/메뉴바는 제외한 영역 */}
        <div className="main-layout">
          <div className="left-column">
            <ScheduleSection />
          </div>
          <div className="right-column">
            
            <BudgetSection></BudgetSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
