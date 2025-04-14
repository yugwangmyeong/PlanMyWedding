package com.smhrd.myapp.controller;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.myapp.dto.RecommendationRequest;
import com.smhrd.myapp.dto.WeddingHallResponse;
import com.smhrd.myapp.service.WeddingRecommenderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/wedding-halls")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.219.50:3000"}) // 이 부분 추가
public class WeddingHallController {

    private final WeddingRecommenderService weddingRecommenderService;

    @PostMapping("/details")
    public ResponseEntity<List<WeddingHallResponse>> getHallDetails(@RequestBody RecommendationRequest request) {
        List<WeddingHallResponse> hallDetails = weddingRecommenderService.getTop3HallDetails(request.getHallNames());
        return ResponseEntity.ok(hallDetails);
    }
}
