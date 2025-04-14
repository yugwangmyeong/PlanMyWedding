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

@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.219.50:3000"}) // 리액트 연동 시 필요
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
        	System.out.println("❌ 회원탈퇴 중 오류 발생: " + e.getMessage());
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
        String currentPassword = updates.get("currentPassword"); // 👈 현재 비밀번호
        String newPassword = updates.get("newPassword");         // 👈 새 비밀번호

        
        boolean success = userService.updateUser(email, currentPassword, newUsername, newPassword);
        if (!success) {
            return ResponseEntity.badRequest().body("현재 비밀번호가 일치하지 않습니다.");
        }
        
        return ResponseEntity.ok("회원 정보 수정 완료");
    }

    //회원가입 매서드
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> userData) {
        String email = userData.get("email");
        String username = userData.get("name");  // 닉네임
        String password = userData.get("password");

        if (userService.findByEmail(email) != null) {
            return ResponseEntity.badRequest().body("이미 등록된 이메일입니다.");
        }

        userService.saveUser(email, username, password);
        return ResponseEntity.ok("회원가입 성공");
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
    

    // 신규 API: 아이디 찾기 (닉네임을 통한)
    @GetMapping("/user/find-id")
    public ResponseEntity<?> findIdByUsername(@RequestParam String username) {
        User user = userService.findByUsername(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("해당 닉네임에 해당하는 사용자를 찾을 수 없습니다.");
        }
        // 일반적으로 로그인 아이디는 이메일로 사용
        return ResponseEntity.ok(Map.of("email", user.getEmail()));
    }
    
    // 신규 API: 비밀번호 찾기 (아이디를 통한)
    @GetMapping("/user/find-password")
    public ResponseEntity<?> findPasswordByEmail(@RequestParam String email) {
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("해당 이메일에 해당하는 사용자를 찾을 수 없습니다.");
        }
        // 보안상 문제될 수 있음: 실제 서비스에서는 임시 비밀번호, 인증 절차 등이 필요함
        return ResponseEntity.ok(Map.of("password", user.getPassword()));
    }


}
