package com.smhrd.myapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommunityDto {
    private String commTitle;
    private String commContent;
    private String commFile;
    private String commService;
    private String commRegion;
    private Long userId; // 작성자 ID
}