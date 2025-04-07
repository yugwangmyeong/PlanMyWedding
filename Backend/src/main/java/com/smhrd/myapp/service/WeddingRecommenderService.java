package com.smhrd.myapp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.smhrd.myapp.dto.RecommendationRequest;
import com.smhrd.myapp.dto.WeddingHallResponse;
import com.smhrd.myapp.entity.WeddingHall;
import com.smhrd.myapp.repository.WeddingHallRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WeddingRecommenderService {

    private final WeddingHallRepository weddingHallRepository;

    public List<WeddingHallResponse> recommend(RecommendationRequest req) {
        // 예: priority 또는 style 등 조건 기반 필터링은 여기에서!
    	List<WeddingHall> all = weddingHallRepository.findAll();

        // 필터 예시 (게스트 수 기준 필터링)
        return all.stream()
            .filter(hall -> filterByRegion(hall, req.getRegion())) // 필요 시 조건 추가
            .limit(5) // 임시로 상위 5개만
            .map(hall -> new WeddingHallResponse(
            	    hall.getWhIdx(),
            	    hall.getWhName(),
            	    hall.getWhAddr(),
            	    hall.getWhTel(),
            	    hall.getWhUrl(),
            	    hall.getWhImg1()
            	))
            .collect(Collectors.toList());
    }

    private boolean filterByRegion(WeddingHall hall, String region) {
        return region == null || hall.getWhAddr().contains(region);
    }
}