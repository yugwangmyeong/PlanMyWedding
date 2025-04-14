import React, { useEffect, useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Header from "./Header";
import BudgetSummary from "./Moneycontrol/BudgetSummary";
import BudgetRow from "./Moneycontrol/BudgetRow";
import { calculateSummary } from "./Moneycontrol/calculateSummary";
import {
  getBudgetList,
  createBudgetItem,
  updateBudgetItem,
  deleteBudgetItem,
} from "./Moneycontrol/services/Budgetapi";
import "./styles/moneycontrol.css";
import "./styles/budgetcontainer.css";
import Footer from "./Footer";

const MoneyControl = () => {
  const [items, setItems] = useState([]);

  // API로부터 예산 항목 리스트를 불러와 상태 업데이트
  const fetchBudgetList = useCallback(async () => {
    try {
      const res = await getBudgetList();
      console.log("✅ 불러온 예산 목록:", res.data);
      setItems(res.data);
    } catch (err) {
      console.error("❌ 예산 목록 로딩 실패:", err);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetchBudgetList();
    return () => {
      isMounted = false;
    };
  }, [fetchBudgetList]);

  // 항목 수정 (신규 항목이면 등록, 아니면 업데이트)
  const handleUpdateItem = async (updatedItem) => {
    try {
      let savedItem;
      if (updatedItem.isNew) {
        const res = await createBudgetItem(updatedItem);
        savedItem = { ...res.data, isNew: false };
      } else {
        await updateBudgetItem(updatedItem);
        savedItem = { ...updatedItem, isNew: false };
      }
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.bgIdx === savedItem.bgIdx ? savedItem : item
        )
      );
    } catch (err) {
      console.error("❌ 항목 저장 실패:", err);
    }
  };

  // 항목 삭제
  const handleDeleteItem = async (bgIdx) => {
    try {
      await deleteBudgetItem(bgIdx);
      setItems((prevItems) =>
        prevItems.filter((item) => item.bgIdx !== bgIdx)
      );
    } catch (err) {
      console.error("❌ 삭제 실패:", err.response?.data || err.message);
    }
  };

  // 새로운 항목 추가
  const handleAddRow = () => {
    // 이미 신규 항목이 존재하면 추가하지 않음
    if (items.some((item) => item.isNew)) return;
    const newItem = {
      name: "",
      budget: 0,
      spent: 0,
      manager: "",
      memo: "",
      isNew: true,
      bgIdx: null,
    };
    setItems((prev) => [...prev, newItem]);
  };

  // 드래그 앤 드롭 종료 시 항목 순서 업데이트
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(items);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setItems(reordered);
  };

  return (
    <div>
      <Header />
      <div className="budget-container">
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
                    key={item.bgIdx || `new-${index}`}
                    draggableId={String(item.bgIdx || `new-${index}`)}
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
                          onDelete={handleDeleteItem}
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
      <Footer/>
    </div>
  );
};

export default MoneyControl;
