import React,{ useState, useRef, useEffect}  from 'react'
import AddBudgetItem from './AddBudgetItem';
import Header from './Header'

import './styles/schedule.css'
//schedule css스타일이랑 같이사용


//임시데이터
const initialData = [
  { name: "드레스", budget: 180, spent: 100, manager: "", memo: "" },
  { name: "턱시도", budget: 0, spent: 0, manager: "함께", memo: "" },
  { name: "사진", budget: 180, spent: 0, manager: "함께", memo: "" },
  { name: "Hair & Makeup", budget: 30, spent: 0, manager: "함께", memo: "" },
  { name: "스킨케어", budget: 30, spent: 0, manager: "함께", memo: "" },
  { name: "동영상", budget: 60, spent: 0, manager: "함께", memo: "" },
  { name: "부케", budget: 15, spent: 0, manager: "함께", memo: "" },
  { name: "헬퍼비", budget: 60, spent: 0, manager: "함께", memo: "" },
];




const Moneycontrol = () => {
  const [items, setItems] = useState(initialData);      // 기존 항목 + 추가 항목 포함
  const [isAdding, setIsAdding] = useState(false);      // 입력폼 표시 여부
  const [addingRows, setAddingRows] = useState([]); // 여러 개의 입력폼 저장
  const [showAddButton, setShowAddButton] = useState(false); // 🔥 추가 버튼 표시 제어
  const [hasSubmitted, setHasSubmitted] = useState(false); // 새 항목 추가 후만 버튼 보임
  const [isAddingRow, setIsAddingRow] = useState(false);

  const handleAddRow = () => {
    setAddingRows((prev) => [...prev, {}]);
    setIsAddingRow(true);
  };
  
  const handleItemAdd = (newItem, idx) => {
    setItems((prev) => [...prev, newItem]);
    console.log(idx)
  };
  const handleCancelLastRow = () => {
    setAddingRows((prev) => prev.slice(0, -1)); // 마지막 입력폼 제거
    setIsAddingRow(false);
  };
  const handleDeleteRow = (idx) => {
    setAddingRows((rows) => rows.filter((_, i) => i !== idx));
  };
  
  return (
    <div>
      <Header />
      <div className="title-wrap">
        <h1 className="maintitle">예산관리</h1>
        <button className="invite-btn">+ 초대하기</button>
      </div>
      <hr className="custom-line" />
      <div className="budget-box">
        <div className="budget-item"><div className="label">총예산</div><div className="value">₩ 0</div></div>
        <div className="divider" />
        <div className="budget-item"><div className="label">신랑예산</div><div className="value">₩ 0</div></div>
        <div className="divider" />
        <div className="budget-item"><div className="label">신부예산</div><div className="value">₩ 0</div></div>
        <div className="divider" />
        <div className="budget-item"><div className="label">남은예산</div><div className="value">₩ 0</div></div>
      </div>

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
        {items.map((item, idx) => (
          <div key={idx} className="budget-row">
            <div className="budget-col">{item.name}</div>
            <div className="budget-col">{item.budget}</div>
            <div className="budget-col">{item.spent}</div>
            <div className="budget-col">{item.manager}</div>
            <div className="budget-col">{item.memo}</div>
          </div>
        ))}

        {addingRows.map((_, idx) => (
          <AddBudgetItem
            key={idx}
            idx={idx}
            onAdd={(newItem) => {
              handleItemAdd(newItem, idx)
              setItems([...items, newItem]);
              setHasSubmitted(true);
            }}
            onDelete={handleDeleteRow} // ✅ 삭제 핸들러
          />
        ))}
        <div className="add-item-row" onClick={handleAddRow}>
          + 새항목추가
        </div>
        </div>
        </div>
      </div>
    
  );
};

export default Moneycontrol;