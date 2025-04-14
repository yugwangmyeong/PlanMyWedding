package com.smhrd.myapp.repository;

import java.util.List;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smhrd.myapp.User.*;

public interface BudgetInviteRepository extends JpaRepository<BudgetInvite, Long> {

    // 초대한 사람과 이메일로 중복 초대 방지용
    boolean existsByInviterIdAndInviteeEmail(Long inviterId, String inviteeEmail);

    // 이메일과 상태로 초대 검색 (예: pending 조회용)
    List<BudgetInvite> findByInviteeEmailAndStatus(String email, String status);
    
    Optional<BudgetInvite> findByInviterAndInvitee(User inviter, User invitee);
    
    List<BudgetInvite> findByInviteeAndStatus(User invitee, String status);
    
 


}
