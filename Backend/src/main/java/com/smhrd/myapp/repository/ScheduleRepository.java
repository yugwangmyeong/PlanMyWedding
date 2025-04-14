package com.smhrd.myapp.repository;

import com.smhrd.myapp.User.Schedule;
import com.smhrd.myapp.User.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
	List<Schedule> findByUser(User user);  // 👍userid
	
	void deleteByUser(User user);

	
	Optional<Schedule> findByUserAndScheCategory(User user, String scheCategory);
	
	List<Schedule> findByUserAndScheduleDate(User user, LocalDate scheduleDate);
	
	
	List<Schedule> findByUserAndScheCategoryAndScheduleDate(User user, String scheCategory, LocalDate date);

	
	List<Schedule> findByUserAndScheCategoryAndScheduleDateAndScheTitle(
		    User user, String scheCategory, LocalDate scheduleDate, String scheTitle);
	
	List<Schedule> findAllByUserAndScheCategory(User user, String scheCategory);

	List<Schedule> findByScheIdxIn(List<Long> scheIdxList);
	
	List<Schedule> findByUserId(Long userId);
	
	List<Schedule> findAllByUserIdIn(List<Long> userIds);
	
	boolean existsByUserIdAndScheCategory(Long userId, String scheCategory);




}