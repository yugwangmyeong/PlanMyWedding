package com.smhrd.myapp.controller;

import java.io.File;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
}
