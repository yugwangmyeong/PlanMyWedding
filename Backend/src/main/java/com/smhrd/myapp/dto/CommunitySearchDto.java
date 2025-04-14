package com.smhrd.myapp.dto;

import lombok.Data;

@Data
public class CommunitySearchDto {
    private String searchType; // "author", "title", "content", "title_content"
    private String keyword;
    private int page;         // 0-based index
    private int size;         // 페이지당 게시글 수
}