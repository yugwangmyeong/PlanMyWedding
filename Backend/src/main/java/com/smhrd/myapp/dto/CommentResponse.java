package com.smhrd.myapp.dto;

import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@Builder
public class CommentResponse {
    private Long commentId;
    private Long userId;
    private String content;
    private Timestamp createdAt;
}