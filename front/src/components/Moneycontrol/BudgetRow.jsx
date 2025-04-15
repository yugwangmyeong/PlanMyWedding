import React, { useState, useRef, useEffect } from "react";
import {
  createBudgetItem,
  updateBudgetItem,
  deleteBudgetItem,
} from "./services/Budgetapi";
import "../styles/budgetrow.css";

const BudgetRow = ({ item, onUpdate, onDelete, isNew }) => {
  const [form, setForm] = useState(item);
  const inputRefs = useRef([]);
  const [memoFocus, setMemoFocus] = useState(false);
  const [prevForm, setPrevForm] = useState(item); // 변경 감지용
  const [saving, setSaving] = useState(false);
  const saveTimeoutRef = useRef(null);
  const preventBlurSaveRef = useRef(false);

  useEffect(() => {
    return () => clearTimeout(saveTimeoutRef.current);
  }, []);

  const normalizeForm = (form) => ({
    ...form,
    budget: Number(form.budget),
    spent: Number(form.spent),
    manager:
      form.manager === "" || form.manager === "선택" ? "select" : form.manager,
  });

  const fields = [
    { name: "name", type: "text", placeholder: "항목명" },
    { name: "budget", type: "number", placeholder: "예산" },
    { name: "spent", type: "number", placeholder: "지출" },
    { name: "manager", type: "text", placeholder: "담당자" },
    { name: "memo", type: "text", placeholder: "메모" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (saving) return;
    const dataToSave = normalizeForm(form);
    if (JSON.stringify(dataToSave) === JSON.stringify(prevForm)) return;
    try {
      setSaving(true);
      let savedItem;
      if (!form.bgIdx) {
        const res = await createBudgetItem(dataToSave);
        savedItem = { ...res.data, isNew: false };
      } else {
        await updateBudgetItem(dataToSave);
        savedItem = { ...dataToSave, isNew: false };
      }
      onUpdate(savedItem);
      setForm(savedItem);
      setPrevForm(savedItem);
    } catch (err) {
      //console.error("❌ 저장 실패:", err.response?.data || err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleBlur = () => {
    if (preventBlurSaveRef.current) {
      preventBlurSaveRef.current = false;
      return;
    }
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      handleSave();
    }, 200);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      preventBlurSaveRef.current = true;
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
              onBlur={(e) => {
                if (e.target.value === "") {
                  alert("담당자를 선택해주세요!");
                } else {
                  handleBlur();
                }
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="popup-input"
            >
              <option value="">선택</option>
              <option value="신랑">신랑</option>
              <option value="신부">신부</option>
              <option value="함께">함께</option>
            </select>
          ) : field.name === "memo" ? (
            <div className="memo-wrapper">
              <textarea
                name="memo"
                className="memo-input"
                value={form.memo}
                // 초기 inline style로 60px(3줄) 고정
                style={{ height: "60px" }}
                onChange={(e) => {
                  handleChange(e);
                  if (memoFocus) {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }
                }}
                onFocus={(e) => {
                  setMemoFocus(true);
                  // 포커스 시 내용에 맞게 확장
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onBlur={(e) => {
                  handleSave();
                  setMemoFocus(false);
                  // 포커스 빠지면 60px로 복원
                  e.target.style.height = "60px";
                }}
                placeholder="메모를 입력하세요"
                maxLength={200}
              />
            </div>
          ) : (
            <input
              ref={(el) => (inputRefs.current[index] = el)}
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              onBlur={() => {
                handleBlur();
                setMemoFocus(false);
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              placeholder={field.placeholder}
              className="popup-input"
              maxLength={field.name === "name" ? 7 : undefined}
            />
          )}
        </div>
      ))}
      <div className="action-buttons-wrapper">
        <button
          type="button"
          className="delete-icon-inline"
          onClick={() => onDelete(form.bgIdx)}
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default BudgetRow;
