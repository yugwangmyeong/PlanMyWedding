package com.smhrd.myapp.controller;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.smhrd.myapp.dto.CommunitySearchDto;
import com.smhrd.myapp.entity.Community;
import com.smhrd.myapp.entity.CommunityLike;
import com.smhrd.myapp.repository.CommunityLikeRepository;
import com.smhrd.myapp.repository.UserRepository;
import com.smhrd.myapp.service.CommunityService;
import com.smhrd.myapp.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.219.50:3000"})
public class CommunityController {

    private final CommunityService communityService;
    private final CommunityLikeRepository communityLikeRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    
    // 전체 게시글 조회
    @GetMapping("/all")
    public ResponseEntity<List<Community>> getAllPosts() {
        return ResponseEntity.ok(communityService.findAllPosts());
    }

    // 필터 검색
    @PostMapping("/filter")
    public ResponseEntity<List<Community>> filterPosts(@RequestBody CommunityFilterDto filterDto) {
        return ResponseEntity.ok(communityService.filterPosts(filterDto));
    }

    // 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<Community> getPost(@PathVariable Long id) {
        return ResponseEntity.ok(communityService.getPostById(id));
    }
    
    // 조회수 증가
    @PutMapping("/{id}/view")
    public ResponseEntity<Integer> increaseViewCount(@PathVariable("id") Long id) {
        Community updatedPost = communityService.increaseViewCount(id);
        return ResponseEntity.ok(updatedPost.getCommViews());
    }
    
    // 게시글 작성 (기본 POST)
    @PostMapping
    public ResponseEntity<Community> createPost(@RequestBody CommunityDto dto) {
        return ResponseEntity.ok(communityService.createPost(dto));
    }
    
    // 게시글 작성 (추가 "/write" 엔드포인트 – 필요시)
    @PostMapping("/write")
    public ResponseEntity<Community> createCommunityPost(@RequestBody CommunityDto dto) {
        Community saved = communityService.createPost(dto);
        return ResponseEntity.ok(saved);
    }
    
    // 이미지 업로드
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            String filePath = "uploads/" + fileName; // 실제 경로에 맞도록 수정
            
            File dest = new File(filePath);
            file.transferTo(dest);
            
            return ResponseEntity.ok(filePath);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("업로드 실패");
        }
    }
    
    // 좋아요 토글 엔드포인트 (하나는 남김)
    @PutMapping("/{id}/like")
    public ResponseEntity<Map<String, Object>> toggleLike(
            @PathVariable("id") Long id,
            @RequestParam("userId") Long userId) {
        Community updatedPost = communityService.toggleLike(id, userId);
        Map<String, Object> response = new HashMap<>();
        response.put("commLikes", updatedPost.getCommLikes());
        return ResponseEntity.ok(response);
    }
    
    // GET 좋아요 상태 엔드포인트
    @GetMapping("/{postId}/like-status")
    public ResponseEntity<Map<String, Boolean>> getLikeStatus(
            @PathVariable("postId") Long postId,
            @RequestParam("userId") Long userId) {
        Community community = communityService.getPostById(postId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자가 존재하지 않습니다."));
        
        Optional<CommunityLike> optionalLike = communityLikeRepository.findByCommunityAndUser(community, user);
        boolean liked = optionalLike.isPresent();
        return ResponseEntity.ok(Collections.singletonMap("liked", liked));
    }
    
    // 강제 삭제 (좋아요, 댓글 먼저 삭제 후 게시글 삭제)
    @DeleteMapping("/{postId}")
    public ResponseEntity<String> deleteCommunity(
            @PathVariable("postId") Long postId,
            @RequestParam(value = "userId", required = false) Long userId) {
        try {
            communityService.deleteCommunityForcefully(postId, userId);
            return ResponseEntity.ok("게시글 및 연관 데이터 삭제 완료");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("게시글 삭제 실패: " + e.getMessage());
        }
    }
    
    // 사용자 정보 조회 (이메일로)
    @GetMapping("/user/email/{email}")
    public ResponseEntity<LoginRequest> getUserByEmail(@PathVariable String email) {
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        
        LoginRequest dto = new LoginRequest();
        dto.setUserId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        
        return ResponseEntity.ok(dto);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Community> updateCommunityPost(@PathVariable("id") Long id, 
                                                         @RequestBody CommunityDto communityDto) {
        Community updatedPost = communityService.updatePost(id, communityDto);
        return ResponseEntity.ok(updatedPost);
    }
    
    @GetMapping("/search")
    public Page<Community> searchCommunity(
        @RequestParam String searchType,
        @RequestParam String keyword,
        @RequestParam int page,
        @RequestParam int size) {

        CommunitySearchDto searchDto = new CommunitySearchDto();
        searchDto.setSearchType(searchType);
        searchDto.setKeyword(keyword);
        searchDto.setPage(page);
        searchDto.setSize(size);

        return communityService.searchPosts(searchDto); // searchPosts() 로 수정!
    }

    
    
}
