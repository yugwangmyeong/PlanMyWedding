package com.smhrd.myapp.repository;

import com.smhrd.myapp.User.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {

    // 특정 초대 존재 여부 (중복 방지용)
    Optional<Invitation> findByInviterIdAndInviteeIdAndStatus(Long inviterId, Long inviteeId, String status);

    // 현재 로그인 유저가 받은 초대 목록 (PENDING)
    List<Invitation> findAllByInviteeIdAndStatus(Long inviteeId, String status);

    // 초대한 유저가 보낸 초대 내역
    List<Invitation> findAllByInviterId(Long inviterId);
    
    boolean existsByInviteeIdAndStatus(Long inviteeId, String status);
    
    Optional<Invitation> findFirstByInviteeIdAndStatusOrderByCreatedAtDesc(Long inviteeId, String status);

    
    
}	
