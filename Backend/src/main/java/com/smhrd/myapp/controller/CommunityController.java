package com.smhrd.myapp.controller;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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


    // ✅ 게시글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        User user = userService.findByEmail(userDetails.getUsername());
        Community post = communityService.getPostById(id);

        if (!post.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("작성자만 삭제할 수 있습니다.");
        }

        communityService.deletePost(id);
        return ResponseEntity.ok("삭제 완료");
    }
    
    @PostMapping("/write")
    public ResponseEntity<Community> createCommunityPost(@RequestBody CommunityDto dto) {
        Community saved = communityService.createPost(dto);
        return ResponseEntity.ok(saved);
    }
    
    
    
    
    

    
    
    
 // 게시글 작성 (Post 방식)
    @PostMapping("/upload")
    public ResponseEntity<?> createPostWithImage(
        @RequestParam("title") String title,
        @RequestParam("content") String content,
        @RequestParam("userId") Long userId,
        @RequestParam("service") String service,
        @RequestParam("region") String region,
        @RequestParam(value = "file", required = false) MultipartFile file) {

        try {
            CommunityDto dto = new CommunityDto();
            dto.setCommTitle(title);
            dto.setCommContent(content);
            dto.setUserId(userId);
            dto.setCommService(service);
            dto.setCommRegion(region);

            if (file != null && !file.isEmpty()) {
                byte[] fileBytes = file.getBytes();
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

                File uploadDir = new File("C:/upload");
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }

                File saveFile = new File(uploadDir, fileName);
                file.transferTo(saveFile);

                dto.setCommFile(fileBytes);
                dto.setCommFilePath(fileName);
            }

            Community saved = communityService.createPost(dto);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("업로드 실패");
        }
    }
    
    
    
    
    
    
    

    // 게시글 수정 (Put 방식)
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("userId") Long userId,
            @RequestParam("service") String service,
            @RequestParam("region") String region,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        // 현재 로그인한 사용자 정보 가져오기
        User user = userService.findByEmail(userDetails.getUsername());
        Community post = communityService.getPostById(id);

        // 게시글 작성자와 현재 로그인한 사용자가 다르면 수정 불가
        if (!post.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("작성자만 수정할 수 있습니다.");
        }

        // DTO 생성하여 수정할 데이터 설정
        CommunityDto dto = new CommunityDto();
        dto.setCommTitle(title);
        dto.setCommContent(content);
        dto.setUserId(userId);
        dto.setCommService(service);
        dto.setCommRegion(region);

        // 파일 처리
        if (file != null && !file.isEmpty()) {
            try {
                byte[] fileBytes = file.getBytes();  // 파일 바이트로 변환
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();  // 파일 이름 생성
                
                // 업로드 디렉토리 경로 지정
                File uploadDir = new File("C:/upload");
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();  // 디렉토리가 없으면 생성
                }

                // 파일 저장 경로 설정
                File saveFile = new File(uploadDir, fileName);
                
                // 파일을 지정된 경로에 저장
                file.transferTo(saveFile);

                // 저장한 파일의 바이트 데이터를 DTO에 저장
                dto.setCommFile(fileBytes);
                dto.setCommFilePath(fileName);

            } catch (IOException e) {
                e.printStackTrace();  // 예외 출력
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("업로드 실패");
            }
        }

        // 게시글 수정
        Community updatedPost = communityService.updatePost(id, dto);

        // 수정된 게시글 반환
        return ResponseEntity.ok(updatedPost);
    }

    
    
    
    
    
    
    

    
 // 이미지 파일 경로 기반
    @GetMapping("/image/by-filename/{filename}")
    public ResponseEntity<Resource> getImageByFilename(@PathVariable String filename) throws MalformedURLException {
        java.nio.file.Path imagePath = Paths.get("uploads").resolve(filename);
        Resource resource = new UrlResource(imagePath.toUri());

        if (resource.exists()) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)  // 필요 시 확장자에 따라 설정
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 이미지 byte[] (DB에 저장된 경우)
    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        Community post = communityService.getPostById(id);
        byte[] imageBytes = post.getCommFile();
        if (imageBytes == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header("Content-Type", "image/jpeg") // 또는 png 등
                .body(imageBytes);
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
