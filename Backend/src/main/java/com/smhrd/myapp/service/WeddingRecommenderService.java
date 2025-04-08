package com.smhrd.myapp.service;

import com.smhrd.myapp.dto.WeddingHallResponse;
import com.smhrd.myapp.entity.WeddingHall;
import com.smhrd.myapp.repository.WeddingHallRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WeddingRecommenderService {

    private final WeddingHallRepository weddingHallRepository;

    public List<WeddingHallResponse> getTop3HallDetails(List<String> hallNames) {
        // DB에서 이름이 일치하는 웨딩홀 가져오기
        List<WeddingHall> halls = weddingHallRepository.findByWhNameIn(hallNames);

        // Entity -> Response DTO로 변환
        return halls.stream().map(hall -> WeddingHallResponse.builder()
                .whName(hall.getWhName())
                .whAddr(hall.getWhAddr())
                .whTel(hall.getWhTel())
                .whUrl(hall.getWhUrl())
                .whImg1(hall.getWhImg1())
                .whImg2(hall.getWhImg2())
                .whImg3(hall.getWhImg3())
                .lat(hall.getLat())
                .lon(hall.getLon())
                .build()
        ).collect(Collectors.toList());
    }
}