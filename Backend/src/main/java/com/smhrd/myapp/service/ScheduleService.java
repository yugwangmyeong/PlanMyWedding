package com.smhrd.myapp.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

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
	    	// userId를 사용해 User 객체를 찾습니다
	        User user = userRepository.findById(userId)
	                .orElseThrow(() -> new RuntimeException("User not found"));
	        
	    	return scheduleRepository.findByUserAndScheCategory(user, "wedding"); // 예: 결혼식만 조회
	    }
}
