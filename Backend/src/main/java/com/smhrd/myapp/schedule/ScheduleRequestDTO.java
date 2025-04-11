package com.smhrd.myapp.schedule;

import lombok.Data;

@Data
public class ScheduleRequestDTO {
    
    private String scheduleDate;      // 실제 일정 날짜 ✅ 추가
    private String scheCategory;
    private String scheStatus;
    private String scheTitle;
}