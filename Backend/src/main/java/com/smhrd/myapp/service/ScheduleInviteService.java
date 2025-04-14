package com.smhrd.myapp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.myapp.User.Invitation;
import com.smhrd.myapp.User.User;
import com.smhrd.myapp.repository.InvitationRepository;
import com.smhrd.myapp.repository.UserRepository;

@Service
public class ScheduleInviteService {

    @Autowired
    private InvitationRepository invitationRepository;

    @Autowired
    private UserRepository userRepository;

    public String getSharedUsername(Long userId) {
        Optional<Invitation> invite = invitationRepository.findFirstByInviteeIdAndStatusOrderByCreatedAtDesc(userId, "ACCEPTED");

        if (invite.isPresent()) {
            Long inviterId = invite.get().getInviterId();
            Optional<User> inviter = userRepository.findById(inviterId);

            return inviter.map(User::getUsername).orElse(null);
        }

        return null;
    }
}
