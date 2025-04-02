import React, { useState, useRef, useEffect } from "react";
import "../styles/budgetrow.css"

const BudgetRow = ({ item, onUpdate, onDelete }) => {
  const [form, setForm] = useState(item);
  const inputRefs = useRef([]);

  const fields = [
    { name: "name", type: "text", placeholder: "항목명" },
    { name: "budget", type: "number", placeholder: "예산" },
    { name: "spent", type: "number", placeholder: "지출" },
    { name: "manager", type: "text", placeholder: "담당자" },
    { name: "memo", type: "text", placeholder: "메모" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
  };

  const handleSave = () => {
    onUpdate(form);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
      const next = inputRefs.current[index + 1];
      if (next) next.focus();
    }
  };

  return (
    <div className="budget-row input-row animate-input">
      {fields.map((field, index) => (
        <div className="budget-col" key={field.name}>
          <input
            ref={(el) => (inputRefs.current[index] = el)}
            type={field.type}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            onBlur={handleSave}
            onKeyDown={(e) => handleKeyDown(e, index)}
            placeholder={field.placeholder}
            className="popup-input"
          />
        </div>
      ))}

      <div className="budget-col action-buttons-wrapper">
        <div className="button-inner-wrap">
          <button
            className="delete-icon-inline"
            onClick={onDelete}
          >
            ✖
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetRow;
