import React from 'react';
import "./eventmodal.css"
const EventModal = ({
  isModalOpen,
  selectedEvent,
  newTitle,
  newDate,
  newEndDate,
  isCompleted,
  setNewTitle,
  setNewDate,
  setNewEndDate,
  setIsCompleted,
  handleAddOrUpdateEvent,
  handleDeleteEvent,
  resetForm,
}) => {
  if (!isModalOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음

  return (
    <div className="modals-backdrop">
      <div className="modals-content">
        <h3>{selectedEvent ? "일정 수정" : "일정 추가"}</h3>
        <input
          type="text"
          placeholder="일정 제목"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <input
          type="date"
          value={newEndDate}
          onChange={(e) => setNewEndDate(e.target.value)}
        />
        <label style={{ marginTop: "10px" }}>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />{" "}
          완료 여부
        </label>
        <div className="modals-buttons">
          <button onClick={handleAddOrUpdateEvent}>
            {selectedEvent ? "수정하기" : "추가하기"}
          </button>
          {selectedEvent && (
            <button onClick={handleDeleteEvent} className="delete-button">
              삭제하기
            </button>
          )}
          <button onClick={resetForm} className="delete-button">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
