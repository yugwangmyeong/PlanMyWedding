import React from 'react'
import Header from './Header'
import "./styles/schedule.css";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Calender1 from './Schedule/Calender';
const Schedule = () => {
  return (
    <div>
      <Header />
      <div className="title-wrap">
        <h1 className="maintitle">일정관리</h1>
        <button className="invite-btn">+ 초대하기</button>
      </div>
      <hr className="custom-line" />
      <Calender1></Calender1>
    </div>

  )
}


export default Schedule
