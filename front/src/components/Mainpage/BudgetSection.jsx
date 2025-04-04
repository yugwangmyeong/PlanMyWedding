import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

import "../styles/budgetsection.css";

const BudgetSection = () => {
  Chart.register(ArcElement, Tooltip, Legend);
  const total = 1000000;
  const spent = 400000;
  const groom = 250000;
  const bride = 150000;
  const remaining = total - spent;

  const chartData = {
    labels: ["신랑 예산", "신부 예산", "남은 예산"],
    datasets: [
      {
        data: [groom, bride, remaining],
        backgroundColor: ["#42a5f5", "#f48fb1", "#c8e6c9"],
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
          <div className="amount strong">6,000만원</div>
        </div>

        <div className="budget-row">
          <div>
            사용한 예산 <span className="percent">0%</span>
          </div>
          <div className="amount">0만원</div>
        </div>

        <div className="budget-row">
          <div>
            남은 예산 <span className="percent">100%</span>
          </div>
          <div className="amount">6,000만원</div>
        </div>

        <div className="budget-row">
          <div>
            신부 예산 <span className="percent">50%</span>
          </div>
          <div className="amount">3,000만원</div>
        </div>

        <div className="budget-row">
          <div>
            신랑 부담 <span className="percent">50%</span>
          </div>
          <div className="amount">3,000만원</div>
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
