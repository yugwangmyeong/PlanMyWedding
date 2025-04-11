package com.smhrd.myapp.service;

import java.util.List;

import com.smhrd.myapp.MoneyControl.BudgetDto;

public interface BudgetService {
    void updateBudget(Long bgIdx, BudgetDto dto);	//수정
    List<BudgetDto> getBudgetList(Long userId);		//조회
    
    BudgetDto createBudget(BudgetDto dto, Long userId);		//등록
    void deleteBudget(Long bgIdx);				//삭제
    

}