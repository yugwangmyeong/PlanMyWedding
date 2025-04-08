package com.smhrd.myapp.controller;

<<<<<<< HEAD
import com.smhrd.myapp.LoginRequest.LoginRequest;
import com.smhrd.myapp.service.UserService;
import lombok.RequiredArgsConstructor;
=======
import com.smhrd.myapp.LoginRequest.JwtUtil;
import com.smhrd.myapp.LoginRequest.LoginRequest;
import com.smhrd.myapp.User.User;
import com.smhrd.myapp.service.UserService;
import lombok.RequiredArgsConstructor;

import java.util.Map;
import com.smhrd.myapp.LoginRequest.JwtUtil;
>>>>>>> 9e504d2 (🌸 PlanMyWedding - JSG 브랜치 초기 업로드)
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000") // 리액트 연동 시 필요
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
<<<<<<< HEAD

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        boolean success = userService.login(loginRequest.getEmail(), loginRequest.getPassword());

        if (success) {
            return ResponseEntity.ok().body("로그인 성공");
        } else {
            return ResponseEntity.status(401).body("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
    }
=======
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    	boolean success = userService.login(loginRequest.getEmail(), loginRequest.getPassword());

        if (success) {
            // ✅ 로그인 성공했으니 사용자 정보 조회
            User user = userService.findByEmail(loginRequest.getEmail());

            // ✅ 토큰에 username 포함
            String token = jwtUtil.generateToken(user.getEmail(), user.getUsername());

            return ResponseEntity.ok().body(Map.of("token", token));
        } else {
            return ResponseEntity.status(401).body("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
}
>>>>>>> 9e504d2 (🌸 PlanMyWedding - JSG 브랜치 초기 업로드)
}
