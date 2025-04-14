package com.smhrd.myapp.controller;

import com.smhrd.myapp.LoginRequest.JwtUtil;
import com.smhrd.myapp.LoginRequest.LoginRequest;
import com.smhrd.myapp.User.User;
import com.smhrd.myapp.service.UserService;

import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.219.50:3000"})
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // ✅ 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        boolean success = userService.login(loginRequest.getEmail(), loginRequest.getPassword());

        if (!success) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        User user = userService.findByEmail(loginRequest.getEmail());

        // 🔁 JwtUtil 그대로 사용 (userId는 넣지 않음)
        String token = JwtUtil.generateToken(user.getEmail(), user.getUsername());

        return ResponseEntity.ok(Map.of("token", token));
    }

    // ✅ 회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> userData) {
        String email = userData.get("email");
        String username = userData.get("name");
        String password = userData.get("password");

        if (userService.findByEmail(email) != null) {
            return ResponseEntity.badRequest().body("이미 등록된 이메일입니다.");
        }

        userService.saveUser(email, username, password);
        return ResponseEntity.ok("회원가입 성공");
    }

    // ✅ 회원 정보 조회
    @GetMapping("/member")
    public ResponseEntity<?> getUserInfo(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증 실패");
        }

        String email = userDetails.getUsername();
        User user = userService.findByEmail(email);
        return ResponseEntity.ok(Map.of(
            "email", user.getEmail(),
            "username", user.getUsername()
        ));
    }

    // ✅ 회원 정보 수정
    @PutMapping("/member")
    public ResponseEntity<?> updateUser(@AuthenticationPrincipal UserDetails userDetails,
                                        @RequestBody Map<String, String> updates) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증 실패");
        }

        String email = userDetails.getUsername();
        String newUsername = updates.get("username");
        String currentPassword = updates.get("currentPassword");
        String newPassword = updates.get("newPassword");

        boolean success = userService.updateUser(email, currentPassword, newUsername, newPassword);
        if (!success) {
            return ResponseEntity.badRequest().body("현재 비밀번호가 일치하지 않습니다.");
        }

        return ResponseEntity.ok("회원 정보 수정 완료");
    }

    // ✅ 회원 탈퇴
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증 실패");
        }

        String email = userDetails.getUsername();
        try {
            userService.deleteUserByEmail(email);
            return ResponseEntity.ok("회원 탈퇴 완료");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("회원 탈퇴 중 서버 오류 발생");
        }
    }

    // ✅ 프론트가 이메일 → userId 매핑 요청 시 사용하는 API
    @GetMapping("/user/email/{email}")
    public ResponseEntity<?> getUserIdByEmail(@PathVariable String email) {
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(Map.of("userId", user.getId()));
    }
}
