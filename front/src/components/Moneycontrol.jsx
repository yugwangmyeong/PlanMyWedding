import React, { useState } from "react";
import Header from "./Header";
import BudgetRow from "./Moneycontrol/BudgetRow";
import BudgetSummary from "./Moneycontrol/BudgetSummary";
import "./styles/moneycontrol.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const MoneyControl = () => {
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
      name: "",
      budget: 0,
      spent: 0,
      manager: "",
      memo: "",
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(items);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setItems(reordered);
  };

  return (
    <div>
      <Header></Header>
      <div className="title__wrap">
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
                    key={item.id}
                    draggableId={String(item.id)}
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
                          onDelete={() => handleDeleteItem(item.id)}
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
