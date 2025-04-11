package com.smhrd.myapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.smhrd.myapp.User.Budget;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    Optional<Budget> findByBgIdxAndUserId(Long bgIdx, Long userId); // 사용자 확인용
    
    @Query("SELECT b FROM Budget b WHERE b.userId = :userId ORDER BY b.sortOrder ASC")
    List<Budget> findAllByUserId(@Param("userId") Long userId);

    @Query("SELECT COALESCE(MAX(b.sortOrder), 0) FROM Budget b WHERE b.userId = :userId")
    int findMaxSortOrderByUserId(@Param("userId") Long userId);

}