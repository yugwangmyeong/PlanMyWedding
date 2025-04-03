import React, { useState, useRef, useEffect } from "react";
import "../styles/budgetrow.css";

const BudgetRow = ({ item, onUpdate, onDelete }) => {
  const [form, setForm] = useState(item);
  const inputRefs = useRef([]);
  const [memoFocus, setMemoFocus] = useState(false);
  const isMemoExpanded = form.memo.length > 20 && memoFocus;



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
        
        <div
          className={`budget-col ${
            field.name === "budget" || field.name === "spent" ? "narrow" : ""
          }`}
          key={field.name}
        > 
          {field.name === "budget" || field.name === "spent" ? (
            // 예산/지출 항목에 "만원" 단위 붙이기
            <div className="input-with-unit">
              <input
                ref={(el) => (inputRefs.current[index] = el)}
                type="number"
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                onBlur={handleSave}
                onKeyDown={(e) => handleKeyDown(e, index)}
                placeholder={field.placeholder}
                className="popup-input"
              />
              <span className="unit-label">만원</span>
            </div>
          ) : field.name === "manager" ? (
            <select
              ref={(el) => (inputRefs.current[index] = el)}
              name="manager"
              value={form.manager}
              onChange={handleChange}
              onBlur={handleSave}
              className="popup-input"
            >
              <option value="">선택</option>
              <option value="신랑">신랑</option>
              <option value="신부">신부</option>
              <option value="함께">함께</option>
            </select>
          ) :field.name === "memo" ? (
            <textarea
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              name="memo"
              value={form.memo}
              onChange={handleChange}
              onBlur={(e) => {
                handleSave();
                setMemoFocus(false);
              }}
              onFocus={() => setMemoFocus(true)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              placeholder={field.placeholder}
              className={`popup-input memo-input ${memoFocus ? "focused" : ""} ${isMemoExpanded ? "expanded" : ""}`}
              maxLength={200}
            />
          ): (
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
              maxLength={field.name === "name" ? 7 : undefined} // 항목명 7자 제한
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default BudgetRow;
