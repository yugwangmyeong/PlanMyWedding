import React from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarSection from './CalendarSection';
import '../styles/budgetsection.css';
const ScheduleSection = () => {
  return (
    <div className="section schedule-section">
    <h2 className='h2loc'>일정 관리</h2>
    <CalendarSection></CalendarSection>

  </div>
  )
}

export default ScheduleSection;
