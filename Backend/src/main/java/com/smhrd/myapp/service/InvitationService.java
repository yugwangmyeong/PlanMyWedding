package com.smhrd.myapp.service;
import com.smhrd.myapp.repository.ScheduleSharedUserRepository;


import com.smhrd.myapp.User.Invitation;
import com.smhrd.myapp.User.Schedule;
import com.smhrd.myapp.User.ScheduleSharedUser;
import com.smhrd.myapp.repository.InvitationRepository;
import com.smhrd.myapp.repository.ScheduleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.transaction.Transactional;

@Service
public class InvitationService {

    @Autowired
    private InvitationRepository invitationRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private ScheduleSharedUserRepository sharedRepo;

    // ✅ 초대 수락 처리
    public void acceptInvite(Long inviteId, Long userId) {
        Invitation invitation = invitationRepository.findById(inviteId)
                .orElseThrow(() -> new IllegalArgumentException("초대를 찾을 수 없습니다."));

        if (!invitation.getInviteeId().equals(userId)) {
            throw new IllegalArgumentException("본인의 초대만 수락할 수 있습니다.");
        }

        invitation.setStatus("ACCEPTED");
        invitationRepository.save(invitation);

        List<Schedule> schedules = scheduleRepository.findByUserId(invitation.getInviterId());
        for (Schedule schedule : schedules) {
            boolean alreadyShared = sharedRepo.existsByScheIdxAndUserId(schedule.getScheIdx(), userId);
            if (!alreadyShared) {
                sharedRepo.save(new ScheduleSharedUser(schedule.getScheIdx(), userId));
            }
        }
    }

    public void rejectInvite(Long inviteId, Long userId) {
        Invitation invitation = invitationRepository.findById(inviteId)
                .orElseThrow(() -> new IllegalArgumentException("초대를 찾을 수 없습니다."));

        if (!invitation.getInviteeId().equals(userId)) {
            throw new IllegalArgumentException("본인의 초대만 거절할 수 있습니다.");
        }

        invitation.setStatus("REJECTED");
        invitationRepository.save(invitation);
    }

    @Transactional
    public void deleteAcceptedInvites(Long userId) {
        List<Invitation> accepted = invitationRepository.findAllByInviteeIdAndStatus(userId, "ACCEPTED");
        invitationRepository.deleteAll(accepted);
        System.out.println("✅ 공유 해제됨: 수락된 초대 " + accepted.size() + "개 삭제 완료");
    }

    
    
    
}
