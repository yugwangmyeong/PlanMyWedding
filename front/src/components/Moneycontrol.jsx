import React from 'react'
import Header from './Header'
import './styles/schedule.css'
//schedule css스타일이랑 같이사용
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
  
    </div>
  )
}

export default Moneycontrol
