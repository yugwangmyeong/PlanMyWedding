package com.smhrd.myapp.dto;


import java.sql.Timestamp;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommunityResponse {
    private Long commIdx;
    private String commTitle;
    private String commContent;
    private String commFile;
    private int commViews;
    private int commLikes;
    private Timestamp createdAt;
    private Long userId;
}