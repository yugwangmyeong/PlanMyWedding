package com.smhrd.myapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommunityRequest {
    private String commTitle;
    private String commContent;
    private String commFile;
    private String mbId; // 로그인 사용자 ID
}