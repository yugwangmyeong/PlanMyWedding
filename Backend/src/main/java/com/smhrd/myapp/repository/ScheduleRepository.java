package com.smhrd.myapp.repository;

import com.smhrd.myapp.User.Schedule;
import com.smhrd.myapp.User.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
	List<Schedule> findByUser(User user);  // 👍userid
	
	Optional<Schedule> findByUserAndScheCategory(User user, String scheCategory);
}