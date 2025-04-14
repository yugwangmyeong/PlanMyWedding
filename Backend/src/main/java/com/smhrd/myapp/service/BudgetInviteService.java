package com.smhrd.myapp.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.smhrd.myapp.MoneyControl.BudgetInviteDto;
import com.smhrd.myapp.User.Budget;
import com.smhrd.myapp.User.BudgetInvite;
import com.smhrd.myapp.User.BudgetSharedUser;
import com.smhrd.myapp.User.User;
import com.smhrd.myapp.dto.InviteRequestDTO;
import com.smhrd.myapp.repository.BudgetInviteRepository;
import com.smhrd.myapp.repository.BudgetRepository;
import com.smhrd.myapp.repository.BudgetSharedUserRepository;
import com.smhrd.myapp.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BudgetInviteService {

    private final BudgetInviteRepository budgetinvInviteRepository;
    private final BudgetSharedUserRepository sharedUserRepository;
    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;
    
   
    public void sendInvite(Long inviterId, String targetEmail) {
        User inviter = userRepository.findById(inviterId)
            .orElseThrow(() -> new RuntimeException("초대자 정보 없음"));

        User invitee = userRepository.findByEmail(targetEmail)
            .orElseThrow(() -> new RuntimeException("해당 이메일의 유저를 찾을 수 없습니다."));

        // 이미 초대한 상태인지 중복 체크 필요
        Optional<BudgetInvite> existing = budgetinvInviteRepository.findByInviterAndInvitee(inviter, invitee);
        if (existing.isPresent()) {
            throw new RuntimeException("이미 초대한 사용자입니다.");
        }

        BudgetInvite invite = new BudgetInvite();
        invite.setInviter(inviter);
        invite.setInvitee(invitee);
        invite.setStatus("PENDING");

        budgetinvInviteRepository.save(invite);
    }
    
    public List<BudgetInvite> getPendingInvitesForUser(Long userId) {
        User invitee = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        return budgetinvInviteRepository.findByInviteeAndStatus(invitee, "PENDING");
    }
    
    public void acceptInvite(Long inviteId, Long userId) {
        BudgetInvite invite = budgetinvInviteRepository.findById(inviteId)
            .orElseThrow(() -> new RuntimeException("해당 초대를 찾을 수 없습니다."));

        // 초대받은 사람과 로그인 유저가 일치하는지 확인
        if (!invite.getInvitee().getId().equals(userId)) {
            throw new RuntimeException("초대를 수락할 권한이 없습니다.");
        }

        // 상태 업데이트
        invite.setStatus("ACCEPTED");
        invite.setCreatedAt(LocalDateTime.now()); // 선택적

        // 저장
        budgetinvInviteRepository.save(invite);

     // ✅ 공유 사용자 등록
        BudgetSharedUser shared = new BudgetSharedUser();
        shared.setBudgetId(null); // 🔸 만약 예산 전체 공유면 null 가능, 아니면 특정 bgIdx 지정해야 함
        shared.setUserId(invite.getInvitee().getId());

        sharedUserRepository.save(shared);
    }



    
    
    

    

    
    
    
    
}

