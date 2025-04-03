import React, { useState } from "react";
import Header from "../Header";
import BudgetRow from "./BudgetRow";
import BudgetSummary from "./BudgetSummary";
import "../styles/moneycontrol.css";

const initialData = [
  { id: 1, name: "드레스", budget: 180, spent: 100, manager: "신부", memo: "" },
  { id: 2, name: "턱시도", budget: 0, spent: 0, manager: "함께", memo: "" },
  { id: 3, name: "사진", budget: 180, spent: 0, manager: "함께", memo: "" },
  { id: 4, name: "헤어&메이크업", budget: 30, spent: 0, manager: "함께", memo: "" },
  { id: 5, name: "스킨케어", budget: 30, spent: 0, manager: "함께", memo: "" },
];

const MoneyControl = () => {
  const [items, setItems] = useState(initialData);

  const handleUpdateItem = (updatedItem) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddRow = () => {
    const newItem = {
      id: Date.now(),
      name: "",
      budget: 0,
      spent: 0,
      manager: "",
      memo: "",
    };
    setItems((prev) => [...prev, newItem]);
  };

  return (
    <div>
      <Header />

      <div className="title-wrap">
        <h1 className="maintitle">예산관리</h1>
        <button className="invite-btn">+ 초대하기</button>
      </div>

      <hr className="custom-line" />

      <BudgetSummary items={items} />

      <h1 className="maintitle2">예산 세부 내역</h1>

      <div className="budget-detail-header">
        <div className="detail-item">항목</div>
        <div className="divider" />
        <div className="detail-item">예산</div>
        <div className="divider" />
        <div className="detail-item">지출</div>
        <div className="divider" />
        <div className="detail-item">담당자</div>
        <div className="divider" />
        <div className="detail-item">메모</div>
      </div>

      <div className="budget-detail-wrapper">
        <div className="budget-list">
          {items.map((item) => (
            <BudgetRow
              key={item.id}
              item={item}
              onUpdate={handleUpdateItem}
              onDelete={() => handleDeleteItem(item.id)}
            />
          ))}

          <div className="add-item-row" onClick={handleAddRow}>
            + 새 항목 추가
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyControl;
