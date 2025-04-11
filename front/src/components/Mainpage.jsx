import React from "react";
import Header from "./Header";
import BudgetSection from "./Mainpage/BudgetSection";
import ScheduleSection from "./Mainpage/ScheduleSection";
import "./styles/mainpage.css";
import Footer from "./Footer";
<<<<<<< HEAD
const Mainpage = () => {
  return (
    <div>
      <Header></Header>
      <hr />
=======
import MinihomeSection from "./Mainpage/MinihomeSection";


const Mainpage = () => {

  const closestSchedule = {
    title: "결혼식",
    date: "2025-04-17",
  };

  return (
    <div>
      <Header></Header>
      
>>>>>>> origin/main
      <div className="main-wrapper">
        {/* 이미 위쪽 헤더/로고/메뉴바는 제외한 영역 */}
        <div className="main-layout">
          <div className="left-column">
            <ScheduleSection />
<<<<<<< HEAD
=======
            <div>
              <MinihomeSection closestSchedule={closestSchedule} />
            </div>
>>>>>>> origin/main
          </div>
          <div className="right-column">
            <BudgetSection></BudgetSection>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Mainpage;
