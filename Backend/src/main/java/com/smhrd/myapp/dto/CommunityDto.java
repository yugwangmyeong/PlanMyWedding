package com.smhrd.myapp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunityDto {
    private String commTitle;
    private String commContent;
    private byte[] commFile;
    private String commService;
    private String commRegion;
    private Long userId; // 작성자 ID
    private String commFilePath;
}