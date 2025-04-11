<<<<<<< HEAD
import React, { useState } from "react";
import Header from "./Header";
import BudgetRow from "./Moneycontrol/BudgetRow";
import BudgetSummary from "./Moneycontrol/BudgetSummary";
=======
import React, { useEffect, useState } from "react";
import Header from "./Header";
import BudgetRow from "./Moneycontrol/BudgetRow";
import BudgetSummary from "./Moneycontrol/BudgetSummary";
import {
  getBudgetList,
  createBudgetItem,
  updateBudgetItem,
  deleteBudgetItem,
} from "./Moneycontrol/services/Budgetapi";
>>>>>>> origin/main
import "./styles/moneycontrol.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const MoneyControl = () => {
<<<<<<< HEAD
  const initialData = [
    {
      id: 1,
      name: "드레스",
      budget: 180,
      spent: 100,
      manager: "신부",
      memo: "",
    },
    { id: 2, name: "턱시도", budget: 0, spent: 0, manager: "함께", memo: "" },
    { id: 3, name: "사진", budget: 180, spent: 0, manager: "함께", memo: "" },
    {
      id: 4,
      name: "헤어&메이크업",
      budget: 30,
      spent: 0,
      manager: "함께",
      memo: "",
    },
    {
      id: 5,
      name: "스킨케어",
      budget: 30,
      spent: 0,
      manager: "함께",
      memo: "",
    },
  ];

  const [items, setItems] = useState(initialData);

  //수정할수있음
  const handleUpdateItem = (updatedItem) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  //삭제함수
  const handleDeleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  //항목추가 함수
  const handleAddRow = () => {
    const newItem = {
      id: Date.now(),
=======
  const [items, setItems] = useState([]);

  useEffect(() => {
    // 불필요한 중복 호출 방지를 위한 플래그
    let isMounted = true;
    
    getBudgetList()
      .then((res) => {
        if (isMounted) {  // 컴포넌트가 여전히 마운트 상태일 때만 상태 업데이트
          console.log("✅ 불러온 예산 목록:", res.data);
          setItems(res.data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("❌ 예산 목록 로딩 실패:", err);
        }
      });
      
    // 클린업 함수
    return () => {
      isMounted = false;
    };
  }, []); // 의존성 배열 확인

  //수정할수있음
  const handleUpdateItem = async (updatedItem) => {
    const newList = items.map((item) =>
      item.bgIdx === updatedItem.bgIdx ? updatedItem : item
    );
    setItems(newList);
  };
  //삭제함수
  const handleDeleteItem = async (bgIdx) => {
    try {
      await deleteBudgetItem(bgIdx);
      const res = await getBudgetList();
      const newList = res.data.filter((item) => item.bgIdx !== undefined);
      setItems(newList); // undefined 제거
    } catch (err) {
      console.error("❌ 삭제 실패:", err.response?.data || err.message);
    }
  };

  //항목추가 함수
  // 수정된 handleAddRow 예시
  const handleAddRow = () => {
    // 이미 isNew가 존재하면 추가하지 않음
    const hasNew = items.some((item) => item.isNew);
    if (hasNew) return;

    const newItem = {
>>>>>>> origin/main
      name: "",
      budget: 0,
      spent: 0,
      manager: "",
      memo: "",
<<<<<<< HEAD
=======
      isNew: true,
      bgIdx: null, // 이게 없으면 key 중복이나 저장 오류 발생 가능
>>>>>>> origin/main
    };
    setItems((prev) => [...prev, newItem]);
  };

<<<<<<< HEAD
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(items);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setItems(reordered);
  };

=======
  const handleDragEnd = async (result) => {
    if (!result.destination) return;
  
    const reordered = Array.from(items);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
  
    // ✅ sortOrder 다시 지정
    const updatedWithSortOrder = reordered.map((item, index) => ({
      ...item,
      sortOrder: index + 1, // 1부터 시작하는 정렬값
    }));
  
    setItems(updatedWithSortOrder); // UI 갱신
  
    // ✅ 변경된 항목만 백엔드에 업데이트
    try {
      for (const item of updatedWithSortOrder) {
        await updateBudgetItem(item); // 기존 API 사용
      }
      console.log("✅ 정렬 순서 업데이트 완료");
    } catch (err) {
      console.error("❌ 정렬 순서 업데이트 실패:", err);
    }
  };
  
>>>>>>> origin/main
  return (
    <div>
      <Header></Header>
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
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="budgetList">
            {(provided) => (
              <div
                className="budget-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {items.map((item, index) => (
                  <Draggable
<<<<<<< HEAD
                    key={item.id}
                    draggableId={String(item.id)}
=======
                    key={item.bgIdx || `new-${index}`}
                    draggableId={String(item.bgIdx || `new-${index}`)}
>>>>>>> origin/main
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <BudgetRow
                          item={item}
                          onUpdate={handleUpdateItem}
<<<<<<< HEAD
                          onDelete={() => handleDeleteItem(item.id)}
=======
                          onDelete={handleDeleteItem} // bgIdx 자동으로 들어감
>>>>>>> origin/main
                        />
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}

                <div className="add-item-row" onClick={handleAddRow}>
                  + 새 항목 추가
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default MoneyControl;
