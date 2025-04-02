import React, { useState, useEffect, useRef } from "react";
import "./styles/addbudgetitem.css";

const AddBudgetItem = ({ onAdd, onDelete, idx }) => {
  const [form, setForm] = useState({
    name: "",
    budget: "",
    spent: "",
    manager: "",
    memo: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // 버튼 상태
  const [editMode, setEditMode] = useState(false);
  const nameInputRef = useRef(null);
  const inputRefs = useRef([]);

  // 컴포넌트 처음 마운트될 때 포커스
  useEffect(() => {
    if (nameInputRef.current) nameInputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // 편집 모드가 아니고 이미 제출된 상태라면 편집 모드로 전환
    if (!editMode && isSubmitted) {
      setEditMode(true);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (index == 4) {
        handleSubmit(); // 여기 수정

      } else {
        const nextInput = inputRefs.current[index + 1];
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleAdd = () => {
    if (isSubmitted) return;
    if (!form.name.trim()) return;
    onAdd({ ...form });
    setIsSubmitted(true);
    setEditMode(false); // 이 줄 추가
  };
  
  const handleSubmit = () => {
    if (!form.name.trim()) return; // 필수 필드 체크
  
    onAdd({
      ...form,
      id: isSubmitted ? form.id : Date.now(),
    });
  
    setIsSubmitted(true);
    setEditMode(false); // 저장 후 수정 모드 해제
  };
  
  // 항목 클릭 시 편집 모드로 전환
  const handleRowClick = () => {
    if (isSubmitted && !editMode) {
      setEditMode(true);
    }
  };
  return (
    <div className="budget-row-wrapper">
      <div
        className="budget-row input-row animate-input"
        onKeyDown={handleKeyDown}
      >
        <div className="budget-col">
          <input
            ref={(el) => {
              nameInputRef.current = el;
              inputRefs.current[0] = el;
            }}
            type="text"
            name="name"
            value={form.name}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={() => {
                if (isSubmitted && !editMode) setEditMode(true);
              }}
            placeholder="항목명"
            className="popup-input"
          />
        </div>
        <div className="budget-col">
          <input
            ref={(el) => (inputRefs.current[1] = el)}
            type="number"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 1)}
            placeholder="예산"
            className="popup-input"
          />
        </div>
        <div className="budget-col">
          <input
            ref={(el) => (inputRefs.current[2] = el)}
            type="number"
            name="spent"
            value={form.spent}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 2)}
            placeholder="지출"
            className="popup-input"
          />
        </div>
        <div className="budget-col">
          <input
            ref={(el) => (inputRefs.current[3] = el)}
            type="text"
            name="manager"
            value={form.manager}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 3)}
            placeholder="담당자"
            className="popup-input"
          />
        </div>
        <div className="budget-col">
          <input
            ref={(el) => (inputRefs.current[4] = el)}
            type="text"
            name="memo"
            value={form.memo}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 4)}
            placeholder="메모"
            className="popup-input"
          />
        </div>
        <div className="budget-col action-buttons-wrapper">
          <div className="button-inner-wrap">
            {isSubmitted && !editMode ? (
              <button className="edit-button" onClick={() => setEditMode(true)}>
                ✎
              </button>
            ) : (
              <button className="save-button" onClick={handleSubmit}>
                ✓
              </button>
            )}
            <button
              className="delete-icon-inline"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(idx);
              }}
            >
              ✖
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBudgetItem;
