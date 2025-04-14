package com.smhrd.myapp.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.smhrd.myapp.User.Invitation;
import com.smhrd.myapp.User.Schedule;
import com.smhrd.myapp.User.User;
import com.smhrd.myapp.repository.InvitationRepository;
import com.smhrd.myapp.repository.ScheduleRepository;
import com.smhrd.myapp.repository.ScheduleSharedUserRepository;
import com.smhrd.myapp.repository.UserRepository;
import com.smhrd.myapp.schedule.ScheduleRequestDTO;

@Service
public class ScheduleService {
	
		@Autowired
		private InvitationRepository invitationRepository;
	
		 @Autowired
		 private ScheduleRepository scheduleRepository;
		 
		 @Autowired
		 private UserRepository userRepository;  // UserRepository 추가
		 
		 private ScheduleSharedUserRepository sharedRepo;

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
	        try {
	            System.out.println("📌 전체 일정 조회 시작 - userId: " + userId);

	            // "다른 사람에게 초대받은" 경우만 체크
	            boolean isInvitee = invitationRepository
	                    .findAllByInviteeIdAndStatus(userId, "ACCEPTED")
	                    .stream()
	                    .anyMatch(invite -> !invite.getInviterId().equals(userId));

	            System.out.println("🔎 진짜 초대받은 사람인지?: " + isInvitee);

	            if (isInvitee) {
	                return getSharedSchedulesOnly(userId);
	            } else {
	                return scheduleRepository.findByUserId(userId);
	            }

	        } catch (Exception e) {
	            System.out.println("❌ 일정 조회 중 오류: " + e.getMessage());
	            e.printStackTrace();
	            return List.of();
	        }
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
	        
	        schedule.setScheStatus(dto.getScheStatus());
	        schedule.setScheCategory(dto.getScheCategory()); // ✅ 이거 반드시 있어야 함

	        if (dto.getScheduleDate() != null && !dto.getScheduleDate().trim().isEmpty()) {
	            try {
	                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	                schedule.setScheduleDate(LocalDate.parse(dto.getScheduleDate(), formatter));
	            } catch (DateTimeParseException e) {
	                throw new RuntimeException("❌ 잘못된 날짜 형식: " + dto.getScheduleDate(), e);
	            }
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

	    
	    
	    //템플릿저장함
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
	    
	    
	    public List<Schedule> getSchedulesByRole(Long userId) {
	        try {
	            // 자신이 초대받은 적이 있는 경우만 공유 모드
	            boolean hasReceivedInvite = invitationRepository.existsByInviteeIdAndStatus(userId, "ACCEPTED");

	            if (hasReceivedInvite) {
	                // 초대받은 사용자 → 공유 일정만 보기
	                return getSharedSchedulesOnly(userId);
	            } else {
	                // 초대한 사용자 또는 일반 사용자 → 본인 일정 보기
	                return scheduleRepository.findByUserId(userId);
	            }

	        } catch (Exception e) {
	            System.out.println("❌ 전체 일정 조회 오류: " + e.getMessage());
	            e.printStackTrace();
	            return List.of();
	        }
	    }
	    
	 // 개인 일정만 반환
	    public List<Schedule> getMyOwnSchedules(Long userId) {
	        return scheduleRepository.findByUserId(userId);
	    }

	    
	 // ScheduleService.java
	    public List<Schedule> getSharedSchedulesOnly(Long userId) {
	        System.out.println("📌 공유 일정 조회 시작 - userId: " + userId);

	        List<Invitation> acceptedInvites = invitationRepository.findAllByInviteeIdAndStatus(userId, "ACCEPTED");
	        System.out.println("✅ 수락된 초대 수: " + acceptedInvites.size());

	        List<Schedule> result = new ArrayList<>();

	        for (Invitation invite : acceptedInvites) {
	            Long inviterId = invite.getInviterId();
	            System.out.println("➡️ 초대한 사람 ID: " + inviterId);

	            List<Schedule> schedules = scheduleRepository.findByUserId(inviterId);
	            System.out.println("🗂 " + inviterId + "의 일정 수: " + schedules.size());

	            result.addAll(schedules);
	        }

	        return result;
	    }

	    
	    public List<Schedule> getSharedSchedulesFromInviters(Long userId) {
	        System.out.println("📌 공유 일정 조회 시작 - userId: " + userId);

	        List<Invitation> acceptedInvites = invitationRepository.findAllByInviteeIdAndStatus(userId, "ACCEPTED");
	        System.out.println("✅ 수락된 초대 수: " + acceptedInvites.size());

	        List<Schedule> result = new ArrayList<>();

	        for (Invitation invite : acceptedInvites) {
	            Long inviterId = invite.getInviterId();
	            System.out.println("➡️ 초대한 사람 ID: " + inviterId);

	            List<Schedule> schedules = scheduleRepository.findByUserId(inviterId);
	            System.out.println("🗂 " + inviterId + "의 일정 수: " + schedules.size());

	            result.addAll(schedules);
	        }

	        return result;
	    }
	    
	    public boolean checkIfTemplateExists(Long userId) {
	        return scheduleRepository.existsByUserIdAndScheCategory(userId, "weddingTemplate");
	    }




	    
	    




}
