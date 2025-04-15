import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

import "../styles/budgetsection.css";

Chart.register(ArcElement, Tooltip, Legend); // ✅ 바깥에서 한 번만 등록

const BudgetSection = ({ summary }) => {
  const {
    totalBudget = 0,
    totalSpent = 0,
    groomSpent = 0,
    brideSpent = 0,
    togetherSpent = 0,
  } = summary || {};

  const remaining = totalBudget - totalSpent;

  const spentPercent = totalBudget
    ? ((totalSpent / totalBudget) * 100).toFixed(0)
    : 0;
  const groomPercent = totalBudget
    ? ((groomSpent / totalBudget) * 100).toFixed(0)
    : 0;
  const bridePercent = totalBudget
    ? ((brideSpent / totalBudget) * 100).toFixed(0)
    : 0;
  const togetherPercent = totalBudget
    ? ((togetherSpent / totalBudget) * 100).toFixed(0)
    : 0;
  const remainingPercent = 100 - spentPercent;

  const chartData = {
    labels: ["신랑 지출", "신부 지출", "함께 지출", "남은 예산"],
    datasets: [
      {
        data: [groomSpent, brideSpent, togetherSpent, remaining],
        backgroundColor: ["#42a5f5", "#f48fb1", "#ce93d8", "#c8e6c9"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // ✅ 차트가 부모에 꽉 차도록
    plugins: {
      legend: {
        position: "right", // 👉 'top', 'bottom', 'left', 'right' 가능
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
    },
  };

  return (
    <div className="section-box">
      <h1 className="h1small">예산</h1>
      <div className="budget-summary-open">
        <div className="budget-row total">
          <div>
            총 예산 <span className="percent">100%</span>
          </div>
          <div className="amount strong">
            {totalBudget.toLocaleString()}만원
          </div>
        </div>

        <div className="budget-row">
          <div>
            총 지출 <span className="percent">{spentPercent}%</span>
          </div>
          <div className="amount">{totalSpent.toLocaleString()}만원</div>
        </div>

        <div className="budget-row">
          <div>
            남은 예산 <span className="percent">{remainingPercent}%</span>
          </div>
          <div className="amount">{remaining.toLocaleString()}만원</div>
        </div>

        <div className="budget-row">
          <div>
            신부 지출 <span className="percent">{bridePercent}%</span>
          </div>
          <div className="amount">{brideSpent.toLocaleString()}만원</div>
        </div>

        <div className="budget-row">
          <div>
            신랑 지출 <span className="percent">{groomPercent}%</span>
          </div>
          <div className="amount">{groomSpent.toLocaleString()}만원</div>
        </div>

        <div className="budget-row">
          <div>
            함께 지출 <span className="percent">{togetherPercent}%</span>
          </div>
          <div className="amount">{togetherSpent.toLocaleString()}만원</div>
        </div>
      </div>

      <div className="budget-chart-box">
      <div className='budget-chart'>
        <Doughnut data={chartData} options={chartOptions} />
      </div>
      </div>
    </div>
  );
};

export default BudgetSection;
