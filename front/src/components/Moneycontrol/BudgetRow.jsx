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
  const isMemoExpanded = form.memo.length > 20 && memoFocus;
  const [prevForm, setPrevForm] = useState(item); // 변경 감지용
  const [saving, setSaving] = useState(false);
  const saveTimeoutRef = useRef(null); // ✅ 변경

  useEffect(() => {
    return () => clearTimeout(saveTimeoutRef.current); // ✅ 컴포넌트 언마운트 시 클린업
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
      console.error("❌ 저장 실패:", err.response?.data || err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleBlur = () => {
    // Enter 키 이후의 blur면 저장하지 않음
    if (preventBlurSaveRef.current) {
      preventBlurSaveRef.current = false;
      return;
    }
    
    // 기존 타임아웃이 있다면 제거
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    
    // 새 타임아웃 설정
    saveTimeoutRef.current = setTimeout(() => {
      handleSave();
    }, 200);
  };

  // 추가할 ref
  const preventBlurSaveRef = useRef(false);

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      // Blur에서 예약된 저장을 막기
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

      // Enter 키 이후의 blur 이벤트에서는 저장하지 않도록 설정
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
                  alert("담당자를 선택해주세요!"); // ❗ 경고만 하고 return
                } else {
                  handleBlur(); // ✅ 선택된 값이 있을 때만 실행됨
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
          ) :field.name === "memo" ? (
            <textarea
              ref={(el) => (inputRefs.current[index] = el)}
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
              className={`popup-input memo-input ${
                memoFocus ? "focused" : ""
              } ${isMemoExpanded ? "expanded" : ""}`}
              maxLength={200}
            />
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
