package com.smhrd.myapp.controller;

import java.util.List;
<<<<<<< HEAD

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.myapp.dto.CommentRequest;
import com.smhrd.myapp.dto.CommentResponse;
import com.smhrd.myapp.service.CommentService;

=======
import javax.annotation.PostConstruct;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.smhrd.myapp.dto.CommentRequest;
import com.smhrd.myapp.entity.Comment;
import com.smhrd.myapp.service.CommentService;
>>>>>>> origin/JSG3
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
<<<<<<< HEAD
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
=======
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.219.50:3000"}) // 프론트엔드와 CORS 설정이 필요한 경우
>>>>>>> origin/JSG3
public class CommentController {

    private final CommentService commentService;

<<<<<<< HEAD
    // 댓글 조회
    @GetMapping("/{postId}/comment")
    public ResponseEntity<List<CommentResponse>> getComments(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPostId(postId));
    }

    // 댓글 작성
    @PostMapping("/{postId}/comment")
    public ResponseEntity<CommentResponse> addComment(@PathVariable Long postId, @RequestBody CommentRequest request) {
        return ResponseEntity.ok(commentService.addComment(postId, request));
=======
    @PostConstruct
    public void init() {
        System.out.println(">>> CommentController loaded and mapped under /api/community");
    }

    // 특정 게시글의 댓글 목록 조회
    @GetMapping("/{postId}/comment")
    public ResponseEntity<List<Comment>> getComments(@PathVariable("postId") Long postId) {
        List<Comment> comments = commentService.getCommentsByCommunityId(postId);
        return ResponseEntity.ok(comments);
    }

    // 댓글 생성 (postId는 URL에서 전달)
    @PostMapping("/{postId}/comment")
    public ResponseEntity<Comment> createComment(
            @PathVariable("postId") Long postId,
            @RequestBody CommentRequest request) {
        Comment comment = commentService.createComment(postId, request.getUserId(), request.getContent());
        return ResponseEntity.ok(comment);
    }

    // 댓글 수정 (작성자 본인만 가능)
    @PutMapping("/comment/{commentId}")
    public ResponseEntity<Comment> updateComment(
            @PathVariable("commentId") Long commentId,
            @RequestBody CommentRequest request) {
        Comment updated = commentService.updateComment(commentId, request.getUserId(), request.getContent());
        return ResponseEntity.ok(updated);
    }

    // 댓글 삭제 (작성자 본인만 가능)
    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<String> deleteComment(
            @PathVariable("commentId") Long commentId,
            @RequestParam("userId") Long userId) {
        commentService.deleteComment(commentId, userId);
        return ResponseEntity.ok("삭제 완료");
>>>>>>> origin/JSG3
    }
}
