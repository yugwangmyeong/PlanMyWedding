package com.smhrd.myapp.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PriceResponse {
    private String wedCategory;
    private String wedTime;
    private int rentalFee;
    private int basicCnt;
    private int foodPrice;
    private String hallName;
    private int additionFee;
}