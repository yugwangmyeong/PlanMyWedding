package com.smhrd.myapp.dto;

<<<<<<< HEAD
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
=======
import lombok.Data;

@Data
>>>>>>> origin/JSG3
public class CommentRequest {
    private Long userId;
    private String content;
}