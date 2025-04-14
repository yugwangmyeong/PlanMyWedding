package com.smhrd.myapp.schedule;

import com.smhrd.myapp.User.Schedule;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleResponseDTO {

    private Long scheIdx;
    private String scheTitle;
    private String scheduleDate;
    private String scheStatus;
    private String scheCategory;

    public ScheduleResponseDTO(Schedule schedule) {
        this.scheIdx = schedule.getScheIdx();
        this.scheTitle = schedule.getScheTitle();
        this.scheduleDate = schedule.getScheduleDate() != null 
            ? schedule.getScheduleDate().toString() 
            : null;
        this.scheStatus = schedule.getScheStatus();
        this.scheCategory = schedule.getScheCategory();
    }
}
