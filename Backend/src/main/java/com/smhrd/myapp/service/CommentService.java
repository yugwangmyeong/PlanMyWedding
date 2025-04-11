package com.smhrd.myapp.service;

import com.smhrd.myapp.dto.CommentRequest;
import com.smhrd.myapp.dto.CommentResponse;
import com.smhrd.myapp.entity.Comment;
import com.smhrd.myapp.entity.Community;
import com.smhrd.myapp.repository.CommentRepository;
import com.smhrd.myapp.repository.CommunityRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

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
    }
}
