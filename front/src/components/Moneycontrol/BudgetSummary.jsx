import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles/budgetsummary.css";

// Chart 구성요소 등록
Chart.register(ArcElement, Tooltip, Legend);

const BudgetSummary = ({ items }) => {
  const totalBudget = items.reduce(
    (sum, item) => sum + Number(item.budget || 0),
    0
  );
  const totalSpent = items.reduce(
    (sum, item) => sum + Number(item.spent || 0),
    0
  );
  const remaining = totalBudget - totalSpent;

  // 차트 데이터 구성 (예시로 각 항목을 동일한 비율로 표시함)
  const chartData = {
    labels: ["총예산", "총지출", "남은예산"],
    datasets: [
      {
        data: [totalBudget, totalSpent, remaining],
        backgroundColor: ["#42a5f5", "#f48fb1", "#c8e6c9"],
        borderWidth: 1,
      },
    ],
  };

  // 차트 옵션 (반응형)
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // 부모 요소의 크기에 맞게 조절
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
    },
  };

  return (
  <div>
    <div className="budget-box">
      <div className="budget-item">
        <div className="label">총예산</div>
        <div className="value"> {totalBudget.toLocaleString()}만원</div>
      </div>
      <div className="divider" />
      <div className="budget-item">
        <div className="label">총지출</div>
        <div className="value">{totalSpent.toLocaleString()}만원</div>
      </div>
      <div className="divider" />
      <div className="budget-item">
        <div className="label">남은예산</div>
        <div className="value">{remaining.toLocaleString()}만원</div>
      </div>
    </div>

    {/* 차트를 위한 추가 영역 */}
    <div className="budget-chart-box">
    <Doughnut data={chartData} options={chartOptions} />
  </div>
</div>

  );
};

export default BudgetSummary;
