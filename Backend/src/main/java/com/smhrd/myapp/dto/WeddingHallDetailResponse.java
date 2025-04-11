package com.smhrd.myapp.dto;

import java.util.List;

import lombok.Data;

@Data
public class WeddingHallDetailResponse {
    private String whName;
    private String whAddr;
    private String whTel;
    private String whUrl;
    private String whImg1;

    private List<PriceResponse> prices; // 👈 가격 정보 리스트
}