package com.smhrd.myapp.service;

import com.smhrd.myapp.User.User;
import com.smhrd.myapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public boolean login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.isPresent() && user.get().getPassword().equals(password);
    }
<<<<<<< HEAD
=======
    
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
    
    
>>>>>>> 9e504d2 (🌸 PlanMyWedding - JSG 브랜치 초기 업로드)
}
