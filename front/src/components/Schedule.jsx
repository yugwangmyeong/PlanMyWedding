import React from 'react'
import Header from './Header'
import "./styles/schedule.css";

const Schedule = () => {
  return (
    <div>
      <Header />
      
      <div className="title-wrap">
        <h1 className="maintitle">일정관리</h1>
        <button className="invite-btn">+ 초대하기</button>
      </div>

      <hr className="custom-line" />
    </div>

  )
}


export default Schedule
