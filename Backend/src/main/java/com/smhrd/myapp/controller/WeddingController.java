package com.smhrd.myapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.myapp.dto.RecommendationRequest;
import com.smhrd.myapp.dto.WeddingHallResponse;
import com.smhrd.myapp.service.WeddingRecommenderService;

import java.util.List;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class WeddingController {

    private final WeddingRecommenderService recommenderService;

    @PostMapping("/recommend")
    public ResponseEntity<List<WeddingHallResponse>> recommendWedding(@RequestBody RecommendationRequest request) {
        List<WeddingHallResponse> result = recommenderService.recommend(request);
        return ResponseEntity.ok(result);
    }
}