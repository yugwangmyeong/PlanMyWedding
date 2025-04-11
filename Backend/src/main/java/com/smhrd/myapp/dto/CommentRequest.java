package com.smhrd.myapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequest {
    private String mbId;
    private String content;
}