package com.smhrd.myapp.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WeddingHallResponse {
    private String whName;
    private String whAddr;
    private String whTel;
    private String whUrl;
    private Double lat;
    private Double lon;
    private String whImg1;
    private String whImg2;
    private String whImg3;

    private String wedCategory;
    private String wedTime;
    private int rentalFee;
    private int basicCnt;
    private int foodPrice;
    private String hallName;
    private int additionFee;
    private Integer carParkCt;
    private List<PriceResponse> prices;
}