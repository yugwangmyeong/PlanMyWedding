package com.smhrd.myapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smhrd.myapp.User.BudgetSharedUser;

public interface BudgetSharedUserRepository extends JpaRepository<BudgetSharedUser, Long> {

    List<BudgetSharedUser> findByUserId(Long userId);

    boolean existsByBudgetIdAndUserId(Long budgetId, Long userId);
    
    void deleteByBudgetIdAndUserId(Long budgetId, Long userId);

}
