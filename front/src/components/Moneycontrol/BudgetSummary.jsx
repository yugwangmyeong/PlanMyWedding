import React from "react";
import "../styles/budgetsummary.css";

const BudgetSummary = ({ items }) => {
<<<<<<< HEAD
  const totalBudget = items.reduce((sum, item) => sum + Number(item.budget || 0), 0);
  const totalSpent = items.reduce((sum, item) => sum + Number(item.spent || 0), 0);
=======
  const totalBudget = items.reduce(
    (sum, item) => sum + Number(item.budget || 0),
    0
  );
  const totalSpent = items.reduce(
    (sum, item) => sum + Number(item.spent || 0),
    0
  );
>>>>>>> origin/main
  const remaining = totalBudget - totalSpent;

  return (
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
  );
};

export default BudgetSummary;
