package com.smhrd.myapp.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.smhrd.myapp.User.User;
import com.smhrd.myapp.entity.Community;
import com.smhrd.myapp.repository.CommentRepository;
import com.smhrd.myapp.repository.CommunityLikeRepository;
import com.smhrd.myapp.repository.CommunityRepository;
import com.smhrd.myapp.repository.ScheduleRepository;
import com.smhrd.myapp.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService{

    private final UserRepository userRepository;
    private final ScheduleRepository scheduleRepository;
    
    private final CommunityRepository communityRepository;
    private final CommunityLikeRepository communityLikeRepository;
    private final CommentRepository commentRepository;

    public boolean login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.isPresent() && user.get().getPassword().equals(password);
    }
    
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
    
 // 추가: 닉네임(사용자명)으로 사용자 조회
    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
    
    // 회원 탈퇴 메서드
    // 회원 탈퇴 메서드 (게시글, 좋아요, 댓글 등 연관 데이터도 함께 삭제)
    @Transactional
    public void deleteUserByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) return;

        User user = optionalUser.get();
        
        // 1️⃣ 유저 일정 삭제
        scheduleRepository.deleteByUser(user);

        // 2️⃣ 사용자 작성 게시글 및 해당 게시글의 연관 데이터 삭제
        List<Community> posts = communityRepository.findByUser(user);
        if (posts != null && !posts.isEmpty()) {
            for (Community post : posts) {
                // 게시글에 달린 좋아요 삭제
                communityLikeRepository.deleteByCommunity(post);
                
                // 게시글에 달린 댓글 삭제
                commentRepository.deleteByCommunity(post);
                
                // 게시글 자체 삭제
                communityRepository.delete(post);
            }
        }
        
        // 추가: 사용자가 다른 게시글에 남긴 좋아요나 댓글 등 별도 데이터가 있다면 아래 처리 가능
        // 예: communityLikeRepository.deleteByUser(user);
        
        // 3️⃣ 최종적으로 유저 삭제
        userRepository.delete(user);
    }
    
    
    @Transactional
    public boolean updateUser(String email, String currentPassword, String newUsername, String newPassword) {
        User user = userRepository.findByEmail(email).orElseThrow();

        // 현재 비밀번호가 일치하는지 확인
        if (!user.getPassword().equals(currentPassword)) {
            return false; // 비밀번호 불일치
        }

        user.setUsername(newUsername);
        user.setPassword(newPassword);
        userRepository.save(user);

        return true;
    }



    @Transactional
    public void saveUser(String email, String username, String password) {
        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword(password); // 👉 나중에 암호화 필요 시 여기서 처리

        userRepository.save(user);
    }
    
 // ✅ Spring Security가 호출하는 메서드
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("해당 이메일의 사용자를 찾을 수 없습니다: " + email));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),           // username 역할로 email 사용
                user.getPassword(),       // password
                java.util.Collections.emptyList()   // 권한 없음
                
        );
    }
    
}
