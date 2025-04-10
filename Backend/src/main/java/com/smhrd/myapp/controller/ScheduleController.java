package com.smhrd.myapp.controller;


import com.smhrd.myapp.User.Schedule;
import com.smhrd.myapp.schedule.WeddingDateRequestDTO;
import com.smhrd.myapp.service.ScheduleService;

import ch.qos.logback.classic.Logger;

import com.smhrd.myapp.User.User;
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
import java.util.Optional;


@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {
	
	
	
	
	@Autowired
    private ScheduleService scheduleService;

    

 // ✅ 1. 결혼식 날짜 조회 (없으면 팝업 띄우기)
    @GetMapping("/wedding")
    public ResponseEntity<?> getWeddingDate(@AuthenticationPrincipal CustomUserDetails userDetails) {
    	try {
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
    		 Long userId = userDetails.getUser().getId();
             LocalDate weddingDate = LocalDate.parse(request.getWeddingDate());

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

}
