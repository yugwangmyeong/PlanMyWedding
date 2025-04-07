package com.smhrd.myapp.service;

import com.smhrd.myapp.User.User;
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
        userRepository.deleteUserByEmail(email); 
    }
    
    @Transactional
    public void updateUser(String email, String newUsername, String newPassword) {
        User user = userRepository.findByEmail(email).orElseThrow();

        user.setUsername(newUsername);
        user.setPassword(newPassword); // 👉  암호화도 가능,암호화가 필요하다면 여기서 처리
        userRepository.save(user);
        // JPA의 변경 감지로 자동 반영됨
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
