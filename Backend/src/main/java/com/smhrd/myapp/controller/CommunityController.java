package com.smhrd.myapp.controller;

import java.io.File;
<<<<<<< HEAD
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
=======
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
>>>>>>> origin/JSG3
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.RequestMethod;
=======
>>>>>>> origin/JSG3
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

<<<<<<< HEAD
import com.smhrd.myapp.dto.CommunityRequest;
import com.smhrd.myapp.dto.CommunityResponse;
import com.smhrd.myapp.service.CommunityService;

@RestController
@RequestMapping("/api/community")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // 프론트엔드 주소 허용
public class CommunityController {

	@Autowired
	private CommunityService communityService;

	@PostMapping("/all")
	public ResponseEntity<?> getAllPosts() {
	    List<CommunityResponse> posts = communityService.getAllPosts();
	    return ResponseEntity.ok(posts != null ? posts : List.of()); // null 방지
	}

    // 게시글 등록
    @PostMapping("/write")
    public ResponseEntity<CommunityResponse> createPost(@RequestBody CommunityRequest request) {
        CommunityResponse response = communityService.createPost(request);
        return ResponseEntity.ok(response);
    }
    
    
    // 게시글 상세 보기
    @GetMapping("/{id}")
    public ResponseEntity<CommunityResponse> getPost(@PathVariable Long id) {
        return communityService.getPost(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 게시글 수정
    @PutMapping("/{id}")
    public ResponseEntity<CommunityResponse> updatePost(
            @PathVariable Long id,
            @RequestBody CommunityRequest request) {
        return communityService.updatePost(id, request)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 게시글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        boolean deleted = communityService.deletePost(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
    
    // 이미지 업로드 API
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String uploadDir = "C:/upload"; // 파일을 저장할 로컬 경로 (환경에 맞게 변경)
            File uploadPath = new File(uploadDir);
            if (!uploadPath.exists()) {
                uploadPath.mkdirs();
            }
            
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            File saveFile = new File(uploadDir, fileName);
            file.transferTo(saveFile);

            // 프론트엔드에서 접근 가능한 URL (환경에 맞게 수정 필요)
            String imageUrl = "http://localhost:8081/uploads/" + fileName;
            return ResponseEntity.ok(imageUrl);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("업로드 실패");
        }
    }
=======
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

    
    
>>>>>>> origin/JSG3
}
