package com.smhrd.myapp.dto;

import java.time.LocalDate;

import com.smhrd.myapp.User.Schedule;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ScheduleResponseDTO {
    private Long scheIdx;
    private String scheTitle;
    private String scheStatus;
    private String scheCategory;
    private LocalDate scheduleDate;

    public ScheduleResponseDTO(Schedule s) {
        this.scheIdx = s.getScheIdx();
        this.scheTitle = s.getScheTitle();
        this.scheStatus = s.getScheStatus();
        this.scheCategory = s.getScheCategory();
        this.scheduleDate = s.getScheduleDate();
    }
}
