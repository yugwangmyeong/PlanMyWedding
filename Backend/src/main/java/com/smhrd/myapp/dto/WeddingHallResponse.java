package com.smhrd.myapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class WeddingHallResponse {
    private Long id;
    private String name;
    private String address;
    private String tel;
    private String url;
    private String img;
}	