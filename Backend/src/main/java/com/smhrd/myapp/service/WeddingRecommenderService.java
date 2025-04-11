package com.smhrd.myapp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.smhrd.myapp.dto.PriceResponse;
import com.smhrd.myapp.dto.WeddingHallResponse;
import com.smhrd.myapp.entity.WeddingHall;
import com.smhrd.myapp.repository.WeddingHallRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WeddingRecommenderService {

    private final WeddingHallRepository weddingHallRepository;

    public List<WeddingHallResponse> getTop3HallDetails(List<String> hallNames) {
        List<WeddingHall> halls = weddingHallRepository.findByWhNameIn(hallNames);
        
        return halls.stream().map(hall -> {
            // 가격 정보 매핑
        	List<PriceResponse> priceList = hall.getPrices().stream()
                    .map(price -> PriceResponse.builder()
                            .wedCategory(price.getWedCategory())
                            .wedTime(price.getWedTime())
                            .rentalFee(price.getRentalFee())
                            .basicCnt(price.getBasicCnt())
                            .foodPrice(price.getFoodPrice())
                            .hallName(price.getHallName())
                            .additionFee(price.getAdditionFee())
                            .build())
                    .collect(Collectors.toList());

            // 전체 WeddingHallResponse 생성
            return WeddingHallResponse.builder()
                    .whName(hall.getWhName())
                    .whAddr(hall.getWhAddr())
                    .whTel(hall.getWhTel())
                    .whUrl(hall.getWhUrl())
                    .whImg1(hall.getWhImg1())
                    .whImg2(hall.getWhImg2())
                    .whImg3(hall.getWhImg3())
                    .lat(hall.getLat())
                    .lon(hall.getLon())
                    .carParkCt(hall.getCarParkCt())
                    .prices(priceList) // 👈 여기에 가격 정보 주입
                    .build();
        }).collect(Collectors.toList());
    }
}