package com.smhrd.myapp.controller;

import java.util.Collections;
import com.smhrd.myapp.LoginRequest.JwtUtil;
import com.smhrd.myapp.LoginRequest.LoginRequest;
import com.smhrd.myapp.User.User;
import com.smhrd.myapp.service.UserService;

import lombok.RequiredArgsConstructor;

import java.util.Map;
import com.smhrd.myapp.LoginRequest.JwtUtil;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000") // 리액트 연동 시 필요
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    
    //로그인 요청
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
    //회원탈퇴 요청
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@AuthenticationPrincipal UserDetails userDetails) {
    	try {
            if (userDetails == null) {
                System.out.println("❗ userDetails is null");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증 실패");
            }

            String email = userDetails.getUsername();
            System.out.println("✅ 삭제 요청 email: " + email);

            userService.deleteUserByEmail(email); // 여기서 터졌을 가능성도 있음

            return ResponseEntity.ok("회원 탈퇴 완료");
        } catch (Exception e) {
            e.printStackTrace(); // 🧨 실제 에러 콘솔 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("회원 탈퇴 중 서버 오류 발생");
        }
}
    
    //회원정보보내주기 
    @GetMapping("/member")
    public ResponseEntity<?> getUserInfo(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        User user = userService.findByEmail(email);
        return ResponseEntity.ok(Map.of("email", user.getEmail(), "username", user.getUsername()));
    }
    
    //회원정보수정 매서드
    @PutMapping("/member")
    public ResponseEntity<?> updateUser(@AuthenticationPrincipal UserDetails userDetails,
                                        @RequestBody Map<String, String> updates) {
        String email = userDetails.getUsername();
        String newUsername = updates.get("username");
        String newPassword = updates.get("password");

        userService.updateUser(email, newUsername, newPassword);
        return ResponseEntity.ok("회원 정보 수정 완료");
    }



}
