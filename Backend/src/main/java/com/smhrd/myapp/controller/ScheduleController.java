package com.smhrd.myapp.controller;


import com.smhrd.myapp.User.Invitation;
import com.smhrd.myapp.User.Schedule;
import com.smhrd.myapp.User.ScheduleSharedUser;
import com.smhrd.myapp.schedule.ScheduleRequestDTO;
import com.smhrd.myapp.schedule.WeddingDateRequestDTO;
import com.smhrd.myapp.service.ScheduleService;
import com.smhrd.myapp.service.UserService;

import ch.qos.logback.classic.Logger;

import com.smhrd.myapp.User.User;
import com.smhrd.myapp.dto.InvitationResponseDTO;
import com.smhrd.myapp.dto.InviteRequestDTO;
import com.smhrd.myapp.dto.ScheduleResponseDTO;
import com.smhrd.myapp.repository.InvitationRepository;
import com.smhrd.myapp.repository.ScheduleRepository;
import com.smhrd.myapp.repository.ScheduleSharedUserRepository;
import com.smhrd.myapp.repository.UserRepository;
import com.smhrd.myapp.service.CustomUserDetails;
import com.smhrd.myapp.service.InvitationService;

import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {
	
	
	@Autowired
	private ScheduleRepository scheduleRepository;
	
	@Autowired
	private ScheduleSharedUserRepository sharedRepo;

	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
    private ScheduleService scheduleService;
	
	@Autowired
	private InvitationRepository invitationRepository;
	
	@Autowired
	private InvitationService invitationService;



	
    

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
    
    // ✅ 웨딩 템플릿 일정 조회용 API
    @GetMapping("/weddingTemplate")
    public ResponseEntity<?> getWeddingTemplates(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 정보가 없습니다.");
        }

        Long userId = userDetails.getUser().getId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Schedule> templates = scheduleRepository.findAllByUserAndScheCategory(user, "weddingTemplate");
        System.out.println("✅ 유저 ID: " + userId);
        System.out.println("✅ 조회된 템플릿 수: " + templates.size());
        templates.forEach(t -> System.out.println("⏱️ " + t.getScheTitle() + " | " + t.getScheduleDate()));

        return ResponseEntity.ok(templates);
    }
    
    
    
    
    
    //스케줄 초대하는 controller
    @PostMapping("/invites")
    public ResponseEntity<?> inviteUserToSchedule(@RequestBody InviteRequestDTO request,
                                                  @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 정보가 없습니다.");
        }

        try {
            User inviter = userDetails.getUser();
            String targetEmail = request.getEmail();

            Optional<User> inviteeOpt = userRepository.findByEmail(targetEmail);
            if (inviteeOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 이메일을 가진 유저가 없습니다.");
            }

            User invitee = inviteeOpt.get();

            if (invitee.getId().equals(inviter.getId())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("자기 자신에게는 초대할 수 없습니다.");
            }

            // 중복 초대 방지 (PENDING 상태만 체크)
            Optional<Invitation> existing = invitationRepository.findByInviterIdAndInviteeIdAndStatus(
               inviter.getId(), invitee.getId(), "PENDING");

            if (existing.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 초대 요청을 보냈습니다.");
            }

            // 초대 저장
            Invitation invite = new Invitation();
            invite.setInviterId(inviter.getId());
            invite.setInviteeId(invitee.getId());
            invite.setStatus("PENDING");
            invite.setCreatedAt(LocalDateTime.now());
            invitationRepository.save(invite);

            return ResponseEntity.ok("✅ 초대 요청을 보냈습니다.");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("❌ 초대 실패: " + e.getMessage());
        }
    }
    
    //초대목록조회
    @GetMapping("/invites")
    public ResponseEntity<?> getMyInvites(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        Long userId = userDetails.getUser().getId();
        List<Invitation> invites = invitationRepository.findAllByInviteeIdAndStatus(userId, "PENDING");

        List<InvitationResponseDTO> response = invites.stream().map(invite -> {
            Optional<User> inviter = userRepository.findById(invite.getInviterId());
            String name = inviter.map(User::getUsername).orElse("알 수 없음");

            return new InvitationResponseDTO(
                invite.getInviteId(),
                name,
                invite.getStatus(),
                invite.getCreatedAt().toString()
            );
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

  //일정조회
    @GetMapping("/events")
    public ResponseEntity<List<ScheduleResponseDTO>> getEventsByRole(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getUser().getId();

        try {
            List<Schedule> schedules = scheduleService.getSchedulesByRole(userId);
            List<ScheduleResponseDTO> response = schedules.stream()
                    .map(ScheduleResponseDTO::new) // ← 여기서 생성자 활용!
                    .collect(Collectors.toList());


            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("❌ 일정 조회 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    //초대받은 사람은 초대한사람의 일정을 공유
    @GetMapping("/events/shared")
    public ResponseEntity<?> getSharedSchedulesOnly(@AuthenticationPrincipal CustomUserDetails userDetails) {
        System.out.println("📥 [공유 일정 API 호출됨] /events/shared");

        if (userDetails == null || userDetails.getUser() == null) {
            System.out.println("❌ [인증 실패] userDetails 또는 user null");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        try {
            Long userId = userDetails.getUser().getId();
            System.out.println("✅ 로그인한 사용자 ID: " + userId);

            List<Schedule> schedules = scheduleService.getSharedSchedulesOnly(userId);
            System.out.println("📦 공유 일정 개수: " + schedules.size());

            // ✨ 엔티티 → DTO로 변환
            List<ScheduleResponseDTO> response = schedules.stream()
                .map(ScheduleResponseDTO::new)
                .collect(Collectors.toList());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("❌ [공유 일정 오류] " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("서버 오류: " + e.getMessage());
        }
    }

    //초대받은 사람인지 여부 판단 controller
    @GetMapping("/isInvitedUser")
    public ResponseEntity<?> isInvitedUser(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }

        Long userId = userDetails.getUser().getId();
        boolean invited = invitationRepository.existsByInviteeIdAndStatus(userId, "ACCEPTED");
        return ResponseEntity.ok(invited);
    }

    
    //수락하는 controller
    @PostMapping("/invites/accept/{inviteId}")
    public ResponseEntity<?> acceptInvite(@PathVariable Long inviteId,
                                          @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 정보가 없습니다.");
        }

        try {
            Long userId = userDetails.getUser().getId();
            invitationService.acceptInvite(inviteId, userId);
            return ResponseEntity.ok("✅ 초대를 수락하고 일정이 공유되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("❌ 수락 실패: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("❌ 서버 오류: " + e.getMessage());
        }
    }
    
    //거절하는 controller
    @PostMapping("/invites/reject/{inviteId}")
    public ResponseEntity<?> rejectInvite(@PathVariable Long inviteId,
                                          @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 정보가 없습니다.");
        }

        try {
            Long userId = userDetails.getUser().getId();
            invitationService.rejectInvite(inviteId, userId);
            return ResponseEntity.ok("❌ 초대를 거절했습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("❌ 거절 실패: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("❌ 서버 오류: " + e.getMessage());
        }
    }
    
 // InvitationController.java
    @GetMapping("/invites/shared-name")
    public ResponseEntity<?> getSharedInviterName(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getUser().getId();

        Optional<Invitation> accepted = invitationRepository
            .findFirstByInviteeIdAndStatusOrderByCreatedAtDesc(userId, "ACCEPTED");

        if (accepted.isPresent()) {
            Long inviterId = accepted.get().getInviterId();
            Optional<User> inviter = userRepository.findById(inviterId);
            if (inviter.isPresent()) {
                return ResponseEntity.ok(inviter.get().getUsername());
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("공유된 유저 없음");
    }

    
    //공유일정 끊는 controller
    @DeleteMapping("/invites/disconnect")
    public ResponseEntity<?> disconnectSharedCalendar(@AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            Long userId = userDetails.getUser().getId();
            invitationService.deleteAcceptedInvites(userId); // <- 초대 수락된 항목만 삭제
            return ResponseEntity.ok("공유 일정 연결이 해제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("공유 일정 해제 실패: " + e.getMessage());
        }
    }

    
    @GetMapping("/shared-username")
    public ResponseEntity<String> getSharedUsername(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getUser().getId();

        Optional<Invitation> invite = invitationRepository.findFirstByInviteeIdAndStatusOrderByCreatedAtDesc(userId, "ACCEPTED");

        if (invite.isPresent()) {
            Long inviterId = invite.get().getInviterId();
            Optional<User> inviter = userRepository.findById(inviterId);

            return inviter.map(user -> ResponseEntity.ok(user.getUsername()))
                          .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("초대한 사용자 없음"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("공유된 일정 없음");
        }
    }
    
    @GetMapping("/events/template/exist")
    public ResponseEntity<Boolean> checkIfTemplateExists(@AuthenticationPrincipal CustomUserDetails userDetails) {
    	if (userDetails == null) {
            throw new RuntimeException("❗ 사용자 인증 정보가 없습니다.");
        }
        Long userId = userDetails.getUser().getId();
        boolean exists = scheduleService.checkIfTemplateExists(userId);
        return ResponseEntity.ok(exists);
    }



    
    
    




    

    

    

}
