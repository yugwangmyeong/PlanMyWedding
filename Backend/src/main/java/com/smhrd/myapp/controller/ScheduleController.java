package com.smhrd.myapp.controller;


import com.smhrd.myapp.User.Schedule;
import com.smhrd.myapp.schedule.ScheduleRequestDTO;
import com.smhrd.myapp.schedule.WeddingDateRequestDTO;
import com.smhrd.myapp.service.ScheduleService;
import com.smhrd.myapp.service.UserService;

import ch.qos.logback.classic.Logger;

import com.smhrd.myapp.User.User;
import com.smhrd.myapp.repository.ScheduleRepository;
import com.smhrd.myapp.repository.UserRepository;
import com.smhrd.myapp.service.CustomUserDetails;

import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {
	
	
	@Autowired
	private ScheduleRepository scheduleRepository;

	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
    private ScheduleService scheduleService;

    

 // ✅ 1. 결혼식 날짜 조회 (없으면 팝업 띄우기)
    @GetMapping("/wedding")
    public ResponseEntity<?> getWeddingDate(@AuthenticationPrincipal CustomUserDetails userDetails) {
    	try {
    		if (userDetails == null || userDetails.getUser() == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 정보가 없습니다.");
            }
    		
            Long userId = userDetails.getUser().getId();

            // 결혼식 일정 조회
            Optional<Schedule> schedule = scheduleService.getWeddingDate(userId);
            if (schedule.isPresent()) {
                return ResponseEntity.ok(schedule.get());
            } else {
                // 결혼식 일정이 없으면 적절한 ResponseEntity를 반환
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("결혼식 일정이 없습니다.");
            }
        } catch (Exception e) {
            // 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
        }
    }
    
 // ✅ 2. 결혼식 날짜 저장 (POST)
    @PostMapping("/wedding")
    public ResponseEntity<?> saveWeddingDate(@RequestBody WeddingDateRequestDTO request,
                                             @AuthenticationPrincipal CustomUserDetails userDetails) {
    	 try {
    		 if (userDetails == null || userDetails.getUser() == null) {
    	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 정보가 없습니다.");
    	        }
    		 
    		 Long userId = userDetails.getUser().getId();
    		 System.out.println("userId: " + userId);
    	     System.out.println("request.getWeddingDate() = " + request.getWeddingDate());
             
            
             LocalDate weddingDate = LocalDate.parse(request.getWeddingDate());
             System.out.println("parsed weddingDate = " + weddingDate);
             
             Optional<Schedule> existing = scheduleService.getWeddingDate(userId);
             if (existing.isPresent()) {
                 return ResponseEntity.status(409).body("이미 결혼식 일정이 등록되어 있습니다.");
             }

             Schedule saved = scheduleService.saveWeddingDate(userId, weddingDate);
             return ResponseEntity.ok(saved);
         } catch (Exception e) {
             e.printStackTrace();
             return ResponseEntity.status(500).body("서버 오류가 발생했습니다: " + e.getMessage());
         }
    }
    
    //일정추가
    @PostMapping("/event")
    public ResponseEntity<?> createSchedule(@RequestBody ScheduleRequestDTO dto,
                                            @AuthenticationPrincipal CustomUserDetails userDetails) {
    	
    	System.out.println("📅 scheduleDate: " + dto.getScheduleDate()); // 🔄 reservedAt → scheduleDate
    	System.out.println("📌 title: " + dto.getScheTitle());
    	System.out.println("📌 category: " + dto.getScheCategory());
    	System.out.println("📌 status: " + dto.getScheStatus());
        Long userId = userDetails.getUser().getId();
        Schedule saved = scheduleService.createSchedule(userId, dto);
        return ResponseEntity.ok(saved);
    }

    //수정하는거
    @PutMapping("/event/{scheIdx}")
    public ResponseEntity<?> updateSchedule(@PathVariable Long scheIdx,
                                            @RequestBody ScheduleRequestDTO dto,
                                            @AuthenticationPrincipal CustomUserDetails userDetails) {
    	System.out.println("📥 updateSchedule 호출됨 - scheIdx: " + scheIdx);
    	

        Long userId = userDetails.getUser().getId();
        System.out.println("📥 사용자 ID: " + userId);
        Schedule updated = scheduleService.updateSchedule(scheIdx, userId, dto);
        return ResponseEntity.ok(updated);
    }

 // ✅ 일정 삭제
    @DeleteMapping("/event/{scheIdx}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Long scheIdx,
                                            @AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            if (userDetails == null || userDetails.getUser() == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 정보가 없습니다.");
            }

            Long userId = userDetails.getUser().getId();
            scheduleService.deleteSchedule(scheIdx, userId);
            return ResponseEntity.ok("삭제 완료");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("일정 삭제 실패: " + e.getMessage());
        }
    }

    //일정조회
    @GetMapping("/events")
    public ResponseEntity<List<Schedule>> getUserSchedules(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getUser().getId(); // 현재 로그인된 유저 ID 가져오기
        
        try {
            System.out.println("🔍 getUserSchedules() 호출됨 - 유저 ID: " + userId);
            List<Schedule> schedules = scheduleService.getSchedulesByUserId(userId);
            return ResponseEntity.ok(schedules);
        } catch (Exception e) {
            System.out.println("❌ 일정 조회 중 오류 발생: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
 // ✅ 웨딩 템플릿 일정 저장
    @PostMapping("/weddingTemplate")
    public ResponseEntity<?> saveWeddingTemplate(@RequestBody ScheduleRequestDTO dto,
                                                 @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 정보가 없습니다.");
        }

        Long userId = userDetails.getUser().getId();
        User user = userRepository.findById(userId)
                        .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDate date = LocalDate.parse(dto.getScheduleDate());

        // ✅ 중복 체크 - List로 바꿔서 안전하게 처리
        List<Schedule> existing = scheduleRepository
        	    .findByUserAndScheCategoryAndScheduleDateAndScheTitle(user, "weddingTemplate", date, dto.getScheTitle());

        	if (!existing.isEmpty()) {
        	    System.out.println("⚠️ 이미 같은 날짜에 동일한 템플릿 제목이 존재합니다. 저장하지 않습니다.");
        	    return ResponseEntity.ok().build();
        	}


        Schedule schedule = new Schedule();
        schedule.setUser(user);
        schedule.setScheduleDate(date);
        schedule.setScheTitle(dto.getScheTitle());
        schedule.setScheCategory(dto.getScheCategory());
        schedule.setScheStatus(dto.getScheStatus());

        Schedule saved = scheduleRepository.save(schedule);
        return ResponseEntity.ok(saved);
    }

    

    

}
