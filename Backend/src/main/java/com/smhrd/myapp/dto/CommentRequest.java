package com.smhrd.myapp.dto;

import lombok.Data;

@Data
public class CommentRequest {
    private Long userId;
    private String content;
}