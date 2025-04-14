package com.smhrd.myapp.schedule;

<<<<<<< HEAD
import com.smhrd.myapp.User.Schedule;
import com.smhrd.myapp.dto.ScheduleResponseDTO;

=======
>>>>>>> origin/JSG3
import lombok.Data;

@Data
public class ScheduleRequestDTO {
<<<<<<< HEAD
    private String scheTitle;
    private String scheduleDate;
    private String scheStatus;
    private String scheCategory;
=======
    
    private String scheduleDate;      // 실제 일정 날짜 ✅ 추가
    private String scheCategory;
    private String scheStatus;
    private String scheTitle;
>>>>>>> origin/JSG3
}