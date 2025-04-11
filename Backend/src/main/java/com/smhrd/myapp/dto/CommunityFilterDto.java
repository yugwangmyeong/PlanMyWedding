package com.smhrd.myapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommunityFilterDto {
    private String region;
    private String category;
    private String sort;
}