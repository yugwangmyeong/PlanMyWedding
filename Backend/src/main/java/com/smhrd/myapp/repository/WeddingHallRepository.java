package com.smhrd.myapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.smhrd.myapp.entity.WeddingHall;
import java.util.List;

public interface WeddingHallRepository extends JpaRepository<WeddingHall, Long> {
    List<WeddingHall> findByWhNameIn(List<String> names);  // <-- 이거 반드시 필요!
}