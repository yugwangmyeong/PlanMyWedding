package com.smhrd.myapp.dto;

import java.util.List;
import lombok.Data;

@Data
public class RecommendationRequest {
    private List<String> hallNames;
}