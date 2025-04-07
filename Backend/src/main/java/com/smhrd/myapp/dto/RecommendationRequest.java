package com.smhrd.myapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RecommendationRequest {
    private String weddingDate;
    private String region;
    private String weddingType;
    private String guestCount;
    private String time;
    private String style;
    private String priority;
    private String rentalDuration;
}