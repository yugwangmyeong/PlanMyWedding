package com.smhrd.myapp.schedule;

import com.smhrd.myapp.User.Schedule;
import com.smhrd.myapp.dto.ScheduleResponseDTO;

import lombok.Data;

@Data
public class ScheduleRequestDTO {
    private String scheTitle;
    private String scheduleDate;
    private String scheStatus;
    private String scheCategory;
}