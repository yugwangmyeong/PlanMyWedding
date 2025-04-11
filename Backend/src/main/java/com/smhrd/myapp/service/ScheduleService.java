package com.smhrd.myapp.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.smhrd.myapp.User.Schedule;
import com.smhrd.myapp.User.User;
import com.smhrd.myapp.repository.ScheduleRepository;
import com.smhrd.myapp.repository.UserRepository;
import com.smhrd.myapp.schedule.ScheduleRequestDTO;

@Service
public class ScheduleService {

	 @Autowired
	    private ScheduleRepository scheduleRepository;
	 
	 @Autowired
	    private UserRepository userRepository;  // UserRepository 추가

	    public Schedule saveWeddingDate(Long userId, LocalDate weddingDate) {
	    	// userId를 통해 User 객체를 조회
	        User user = userRepository.findById(userId)
	                .orElseThrow(() -> new RuntimeException("User not found"));
	        
	    	Schedule schedule = new Schedule();
	    	schedule.setUser(user); // 
	        schedule.setScheTitle("결혼식");
	        schedule.setReservedAt(weddingDate);
	        schedule.setScheduleDate(weddingDate);     // ✅ scheduleDate (추가!)
	        schedule.setScheCategory("wedding");
	        schedule.setScheStatus("예정");	
	        schedule.setReservedAt(weddingDate); 
	        return scheduleRepository.save(schedule);
	    }

	    public Optional<Schedule> getWeddingDate(Long userId) {
	    	try {
	            // userId를 사용해 User 객체를 찾습니다
	            User user = userRepository.findById(userId)
	                    .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

	         // wedding 카테고리 일정 조회
	            return scheduleRepository.findByUserAndScheCategory(user, "wedding");
	        } catch (EntityNotFoundException ex) {
	            // 로그에 에러 메시지 출력
	            System.err.println("Error: " + ex.getMessage());
	            throw ex; // 예외를 다시 던져서 클라이언트에 전달할 수 있도록 처리
	        } catch (Exception ex) {
	            // 서버 측 오류 발생 시 로그에 기록
	            System.err.println("Error while fetching wedding date: " + ex.getMessage());
	            throw new RuntimeException("Server error occurred while fetching wedding date.", ex);
	        }
	    }
	    
	    public Schedule createSchedule(Long userId, ScheduleRequestDTO dto) {
	    	
	    	
	        User user = userRepository.findById(userId)
	                      .orElseThrow(() -> new RuntimeException("User not found"));
	        
	        System.out.println("✅ 사용자 ID: " + userId);
	        System.out.println("✅ 사용자 있음? " + userRepository.findById(userId).isPresent());

	        
	     // ✅ 일반 일정 날짜
	        LocalDate scheduleDate = LocalDate.parse(dto.getScheduleDate());
	        
	        Schedule schedule = new Schedule();
	        schedule.setUser(user);
	        schedule.setScheduleDate(scheduleDate);
	        schedule.setScheCategory(dto.getScheCategory());
	        schedule.setScheStatus(dto.getScheStatus());
	        schedule.setScheTitle(dto.getScheTitle());

	        return scheduleRepository.save(schedule);
	    }
	    
	 // 유저 ID로 일정을 조회하는 메서드
	    public List<Schedule> getSchedulesByUserId(Long userId) {
	        // 유저 ID로 유저를 찾음
	        User user = userRepository.findById(userId)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	        // 유저가 가진 일정을 조회
	        return scheduleRepository.findByUser(user);  // 여기서 ScheduleRepository의 findByUser를 사용
	    }
	    
	    public Schedule updateSchedule(Long scheIdx, Long userId, ScheduleRequestDTO dto) {
	        User user = userRepository.findById(userId)
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        Schedule schedule = scheduleRepository.findById(scheIdx)
	                .orElseThrow(() -> new RuntimeException("Schedule not found"));

	        if (!schedule.getUser().getId().equals(userId)) {
	            throw new RuntimeException("수정 권한이 없습니다.");
	        }

	        schedule.setScheTitle(dto.getScheTitle());
	        schedule.setScheCategory(dto.getScheCategory());
	        schedule.setScheStatus(dto.getScheStatus());

	        if (dto.getScheduleDate() != null) {
	            schedule.setScheduleDate(LocalDate.parse(dto.getScheduleDate()));
	        }

	        return scheduleRepository.save(schedule);
	    }
	    
	 // ✅ 일정 삭제 서비스
	    public void deleteSchedule(Long scheIdx, Long userId) {
	        Schedule schedule = scheduleRepository.findById(scheIdx)
	            .orElseThrow(() -> new RuntimeException("일정을 찾을 수 없습니다."));

	        if (!schedule.getUser().getId().equals(userId)) {
	            throw new RuntimeException("삭제 권한이 없습니다.");
	        }

	        scheduleRepository.delete(schedule);
	    }


	    public Schedule saveWeddingTemplate(Long userId, ScheduleRequestDTO dto) {
	        User user = userRepository.findById(userId)
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        LocalDate date = LocalDate.parse(dto.getScheduleDate());

	        // 🔒 날짜 + 카테고리 + 제목까지 중복 확인
	        List<Schedule> existing = scheduleRepository.findByUserAndScheCategoryAndScheduleDate(user, "weddingTemplate", date);

	        if (!existing.isEmpty()) {
	            return existing.get(0); // 이미 있으면 그 일정 반환 (또는 null 등으로 처리 가능)
	        }


	        Schedule schedule = new Schedule();
	        schedule.setUser(user);
	        schedule.setScheduleDate(date);
	        schedule.setScheTitle(dto.getScheTitle());
	        schedule.setScheCategory(dto.getScheCategory());
	        schedule.setScheStatus(dto.getScheStatus());

	        return scheduleRepository.save(schedule);
	    }



}
