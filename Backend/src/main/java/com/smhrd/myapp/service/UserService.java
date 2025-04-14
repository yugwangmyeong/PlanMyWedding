package com.smhrd.myapp.service;

import com.smhrd.myapp.User.User;
import com.smhrd.myapp.repository.ScheduleRepository;
import com.smhrd.myapp.repository.UserRepository;

import io.jsonwebtoken.lang.Collections;
import lombok.RequiredArgsConstructor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

import javax.transaction.Transactional;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService{

    private final UserRepository userRepository;
    private final ScheduleRepository scheduleRepository;

    public boolean login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.isPresent() && user.get().getPassword().equals(password);
    }
    
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
    
    // 회원 탈퇴 메서드
    @Transactional
    public void deleteUserByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) return;

        User user = optionalUser.get();
        

        // 1️⃣ 유저 일정 먼저 삭제
        scheduleRepository.deleteByUser(user);

        // 2️⃣ 그 다음 유저 삭제
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
