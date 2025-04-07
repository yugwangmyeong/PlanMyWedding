package com.smhrd.myapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.smhrd.myapp.entity.WeddingHall;

@Repository
public interface WeddingHallRepository extends JpaRepository<WeddingHall, Long> {
    // 나중에 조건 검색용 메소드 추가 가능 (예: findByAddressContaining)
}