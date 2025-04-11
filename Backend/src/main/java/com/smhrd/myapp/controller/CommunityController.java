package com.smhrd.myapp.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.smhrd.myapp.LoginRequest.LoginRequest;
import com.smhrd.myapp.User.User;
import com.smhrd.myapp.dto.CommunityDto;
import com.smhrd.myapp.dto.CommunityFilterDto;
import com.smhrd.myapp.entity.Community;
import com.smhrd.myapp.service.CommunityService;
import com.smhrd.myapp.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;
    
    
    private final UserService userService;
    
    
    
    // ✅ 전체 게시글
    @GetMapping("/all")
    public ResponseEntity<List<Community>> getAllPosts() {
        return ResponseEntity.ok(communityService.findAllPosts());
    }

    // ✅ 필터 검색
    @PostMapping("/filter")
    public ResponseEntity<List<Community>> filterPosts(@RequestBody CommunityFilterDto filterDto) {
        return ResponseEntity.ok(communityService.filterPosts(filterDto));
    }

    // ✅ 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<Community> getPost(@PathVariable Long id) {
        return ResponseEntity.ok(communityService.getPostById(id));
    }

    // ✅ 게시글 작성
    @PostMapping
    public ResponseEntity<Community> createPost(@RequestBody CommunityDto dto) {
        return ResponseEntity.ok(communityService.createPost(dto));
    }

    // ✅ 게시글 수정
    @PutMapping("/{id}")
    public ResponseEntity<Community> updatePost(@PathVariable Long id, @RequestBody CommunityDto dto) {
        return ResponseEntity.ok(communityService.updatePost(id, dto));
    }

    // ✅ 게시글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        communityService.deletePost(id);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/write")
    public ResponseEntity<Community> createCommunityPost(@RequestBody CommunityDto dto) {
        Community saved = communityService.createPost(dto);
        return ResponseEntity.ok(saved);
    }
    
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            // 예: 실제 저장은 파일 시스템이나 S3에 하고, 경로만 리턴
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            String filePath = "uploads/" + fileName; // 실제 경로에 맞춰 수정

            // 저장 로직은 파일 시스템 or 클라우드로 구현 가능 (여기선 생략)
            File dest = new File(filePath);
            file.transferTo(dest);

            return ResponseEntity.ok(filePath); // 프론트에서 이 URL 저장함
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("업로드 실패");
        }
    }
    
    
    
    
    
    
    
    
    

    @GetMapping("/user/email/{email}")
    public ResponseEntity<LoginRequest> getUserByEmail(@PathVariable String email) {
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        LoginRequest dto = new LoginRequest();
        dto.setUserId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail()); // optional

        return ResponseEntity.ok(dto);
    }
}
