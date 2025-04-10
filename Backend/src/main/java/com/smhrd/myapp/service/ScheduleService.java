package com.smhrd.myapp.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.myapp.User.Schedule;
import com.smhrd.myapp.User.User;
import com.smhrd.myapp.repository.ScheduleRepository;
import com.smhrd.myapp.repository.UserRepository;

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

	            // 결혼식 일정만 조회
	            Optional<Schedule> schedule = scheduleRepository.findByUserAndScheCategory(user, "wedding");
	            
	            if (schedule.isEmpty()) {
	                throw new EntityNotFoundException("Wedding schedule not found for user with id: " + userId);
	            }

	            return schedule;
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
}
