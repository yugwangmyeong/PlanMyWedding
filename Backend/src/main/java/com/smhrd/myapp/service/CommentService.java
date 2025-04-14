package com.smhrd.myapp.service;

<<<<<<< HEAD
import com.smhrd.myapp.dto.CommentRequest;
import com.smhrd.myapp.dto.CommentResponse;
=======
import java.sql.Timestamp;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smhrd.myapp.User.User;
>>>>>>> origin/JSG3
import com.smhrd.myapp.entity.Comment;
import com.smhrd.myapp.entity.Community;
import com.smhrd.myapp.repository.CommentRepository;
import com.smhrd.myapp.repository.CommunityRepository;
<<<<<<< HEAD

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
=======
import com.smhrd.myapp.repository.UserRepository;

import lombok.RequiredArgsConstructor;
>>>>>>> origin/JSG3

@Service
@RequiredArgsConstructor
public class CommentService {

<<<<<<< HEAD
    private final CommentRepository commentRepo;
    private final CommunityRepository communityRepo;

    public List<CommentResponse> getCommentsByPostId(Long postId) {
        Optional<Community> post = communityRepo.findById(postId);
        if (post.isEmpty()) return List.of();

        return commentRepo.findByCommunity(post.get())
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public CommentResponse addComment(Long postId, CommentRequest request) {
        Community post = communityRepo.findById(postId).orElseThrow();

        Comment comment = Comment.builder()
                .community(post)
                .mbId(request.getMbId())
                .content(request.getContent())
                .createdAt(new Timestamp(System.currentTimeMillis()))
                .build();

        Comment saved = commentRepo.save(comment);
        return toDto(saved);
    }

    private CommentResponse toDto(Comment c) {
        return CommentResponse.builder()
                .commentId(c.getCommentId())
                .mbId(c.getMbId())
                .content(c.getContent())
                .createdAt(c.getCreatedAt())
                .build();
=======
    private final CommentRepository commentRepository;
    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;

    // 특정 게시글의 댓글 목록 조회
    public List<Comment> getCommentsByCommunityId(Long communityId) {
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new RuntimeException("게시글이 존재하지 않습니다."));
        return commentRepository.findByCommunity(community);
    }

    // 댓글 생성  (댓글 수 증가)
    @Transactional
    public Comment createComment(Long communityId, Long userId, String content) {
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new RuntimeException("게시글이 존재하지 않습니다."));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자가 존재하지 않습니다."));
        Comment comment = Comment.builder()
                .community(community)
                .user(user)
                .content(content)
                .createdAt(new Timestamp(System.currentTimeMillis()))
                .build();
        Comment savedComment = commentRepository.save(comment);

        // 게시글의 댓글 수 증가
        Integer currentCount = community.getCommentCount();
        community.setCommentCount(currentCount == null ? 1 : currentCount + 1);
        communityRepository.save(community);
        
        return savedComment;
    }

    // 댓글 수정 (작성자만 가능) - @Transactional 추가
    @Transactional
    public Comment updateComment(Long commentId, Long userId, String content) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("댓글이 존재하지 않습니다."));
        // 작성자 정보가 없으면 예외 처리
        if (comment.getUser() == null) {
            throw new RuntimeException("댓글의 작성자 정보가 없습니다.");
        }
        if (!comment.getUser().getId().equals(userId)) {
            throw new RuntimeException("작성자만 수정할 수 있습니다.");
        }
        comment.setContent(content);
        return commentRepository.save(comment);
    }


    // 댓글 삭제 (댓글 수 감소 처리)
    @Transactional
    public void deleteComment(Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("댓글이 존재하지 않습니다."));
        if (!comment.getUser().getId().equals(userId)) {
            throw new RuntimeException("작성자만 삭제할 수 있습니다.");
        }
        
        Community community = comment.getCommunity();
        
        commentRepository.delete(comment);

        // 댓글 삭제 후 댓글 수 감소
        Integer currentCount = community.getCommentCount();
        community.setCommentCount(currentCount == null || currentCount <= 0 ? 0 : currentCount - 1);
        communityRepository.save(community);
>>>>>>> origin/JSG3
    }
}
