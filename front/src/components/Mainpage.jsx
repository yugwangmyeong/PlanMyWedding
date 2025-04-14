<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React, { useEffect, useState }  from "react";
>>>>>>> origin/JSG3
import Header from "./Header";
import BudgetSection from "./Mainpage/BudgetSection";
import ScheduleSection from "./Mainpage/ScheduleSection";
import "./styles/mainpage.css";
import Footer from "./Footer";
import { getBudgetList } from "./Moneycontrol/services/Budgetapi";
import { calculateSummary } from "./Moneycontrol/calculateSummary";
<<<<<<< HEAD
import {
  getWeddingTemplates,
  getWeddingDate,
} from "./Schedule/utils/WeddingApi";
=======
>>>>>>> origin/JSG3
import MinihomeSection from "./Mainpage/MinihomeSection";
const Mainpage = () => {
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState(null);
<<<<<<< HEAD
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. 예산 데이터 불러오기
        const budgetRes = await getBudgetList();
        console.log("📦 Mainpage에서 가져온 예산 목록:", budgetRes.data);
        setItems(budgetRes.data);
        const summary = calculateSummary(budgetRes.data);
        console.log("✅ 계산된 summary:", summary);
        setSummary(summary);

        // 2. 웨딩 템플릿 일정 불러오기
        // 2. 템플릿 + 결혼식 일정 병합
        const [templateRes, weddingRes] = await Promise.all([
          getWeddingTemplates(),
          getWeddingDate(),
        ]);

        console.log("📥 템플릿 원본 응답:", templateRes);
        console.log("📥 결혼식 일정 응답:", weddingRes);

        const templates = Array.isArray(templateRes)
          ? templateRes
          : Array.isArray(templateRes?.data)
          ? templateRes.data
          : [];
        const wedding = weddingRes;

        // ✅ 중복 없이 병합
        let merged = [...templates];

        if (wedding && wedding.scheTitle === "결혼식") {
          const alreadyExists = templates.some(
            (item) =>
              item.scheCategory === "wedding" && item.scheTitle === "결혼식"
          );

          if (!alreadyExists) {
            merged.push(wedding);
          }
        }

        console.log("📦 병합된 템플릿 목록:", merged);
        setTemplates(merged);
      } catch (err) {
        console.error("❌ 템플릿 로딩 실패:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
=======

  const closestSchedule = {
    title: "결혼식",
    date: "2025-04-17",
  };

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
     
     <Header/>
>>>>>>> origin/JSG3
      <div className="main-wrapper">
        {/* 이미 위쪽 헤더/로고/메뉴바는 제외한 영역 */}
        <div className="main-layout">
          <div className="left-column">
            <ScheduleSection />
            <div>
<<<<<<< HEAD
              <MinihomeSection templates={templates} />
=======
              <MinihomeSection closestSchedule={closestSchedule} />
>>>>>>> origin/JSG3
            </div>
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
