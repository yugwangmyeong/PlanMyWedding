import React, { useEffect, useState }  from "react";
import Header from "./Header";
import BudgetSection from "./Mainpage/BudgetSection";
import ScheduleSection from "./Mainpage/ScheduleSection";
import "./styles/mainpage.css";
import Footer from "./Footer";
import { getBudgetList } from "./Moneycontrol/services/Budgetapi";
import { calculateSummary } from "./Moneycontrol/calculateSummary";
const Mainpage = () => {
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getBudgetList()
      .then((res) => {
        console.log("📦 Mainpage에서 가져온 예산 목록:", res.data);
        setItems(res.data);
        const result = calculateSummary(res.data);
        console.log("✅ 계산된 summary:", result);
        setSummary(result);
      })
      .catch((err) => {
        console.error("❌ Mainpage 예산 목록 로딩 실패:", err);
      });
  }, []);
  return (
    <div>
      <Header></Header>
      
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
            <BudgetSection summary={summary}></BudgetSection>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Mainpage;
