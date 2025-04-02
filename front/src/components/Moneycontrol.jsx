import React from 'react'
import Header from './Header'
import './styles/schedule.css'
//schedule css스타일이랑 같이사용

const data = [
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
  return (
    <div>
        <Header></Header>
        <div className="title-wrap">
            <h1 className='maintitle'>예산관리</h1>
            <button className="invite-btn">+ 초대하기</button>
          </div>
          <hr className="custom-line" />
          <br></br>
          <div className="budget-box">
        <div className="budget-item">
          <div className="label">총예산</div>
          <div className="value">₩ 0</div>
        </div>
        <div className="divider" />
        <div className="budget-item">
          <div className="label">신랑예산</div>
          <div className="value">₩ 0</div>
        </div>
        <div className="divider" />
        <div className="budget-item">
          <div className="label">신부예산</div>
          <div className="value">₩ 0</div>
        </div>
        <div className="divider" />
        <div className="budget-item">
          <div className="label">남은예산</div>
          <div className="value">₩ 0</div>
        </div>
      </div>
      <div className=''>
        <h1 className='maintitle2'>예산 세부 내역</h1>
      </div>
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
          {data.map((item, idx) => (
            <div className="budget-row" key={idx}>
              <div className="budget-col">{item.name}</div>
              <div className="budget-col">{item.budget} 만원&nbsp;&nbsp;&nbsp;</div>
              <div className="budget-col">{item.spent} 만원&nbsp;&nbsp;&nbsp;</div>
              <div className="budget-col">{item.manager || "함께"}</div>
              <div className="budget-col">{item.memo || "-"}</div>
            </div>
          ))}
          <div className="add-item-row">+ 새항목추가</div>
        </div>
    </div>

  
    </div>
  )
}

export default Moneycontrol
