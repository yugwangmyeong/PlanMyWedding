package com.smhrd.myapp.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;
import com.smhrd.myapp.MoneyControl.BudgetDto;
import com.smhrd.myapp.User.Budget;
import com.smhrd.myapp.repository.BudgetRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BudgetServiceImpl implements BudgetService {

    private final BudgetRepository budgetRepository;

    @Override
    public void updateBudget(Long bgIdx, BudgetDto dto) {
    	 System.out.println("🔄 업데이트 시도 - bgIdx: " + bgIdx);  // 추가
    	    Budget budget = budgetRepository.findById(bgIdx)
    	        .orElseThrow(() -> new EntityNotFoundException("예산 항목을 찾을 수 없습니다."));
        // 필드 업데이트
        budget.setName(dto.getName());
        budget.setBudget(dto.getBudget());
        budget.setManager(dto.getManager());
        budget.setMemo(dto.getMemo());
        budget.setSpent(dto.getSpent());
        budget.setSortOrder(dto.getSortOrder());
        budgetRepository.save(budget); // 변경 감지로도 처리됨
    }
    
    @Override
    public List<BudgetDto> getBudgetList(Long userId) {
    	

        List<Budget> budgets = budgetRepository.findAllByUserId(userId);
        System.out.println("📥 유저별 예산 목록 불러오기: " + userId);
    	budgets.forEach(b -> System.out.println("➡️ 예산항목: " + b.getName() + ", 정렬값: " + b.getSortOrder()));
        
        // Budget → BudgetDto로 변환
        return budgets.stream()
            .map(b -> new BudgetDto(
                b.getBgIdx(),
                b.getName(),
                b.getBudget(),
                b.getManager(),
                b.getMemo(),
                b.getSpent(),
                b.getSortOrder()
            ))
            .collect(Collectors.toList());
    }

    
    @Override
    public BudgetDto createBudget(BudgetDto dto, Long userId) {
    	
    	 
        Budget entity = new Budget();
        entity.setUserId(userId);
        entity.setName(dto.getName());
        entity.setBudget(dto.getBudget());
        entity.setManager(dto.getManager());
        entity.setMemo(dto.getMemo());
        entity.setSpent(dto.getSpent());
        entity.setCreatedAt(LocalDateTime.now()); // ✅ 여기 추가
        
        
     // ✅ sortOrder 자동 지정
        Integer incomingOrder = dto.getSortOrder();
        int maxOrder = budgetRepository.findMaxSortOrderByUserId(userId);
        entity.setSortOrder((incomingOrder == null || incomingOrder <= 0) ? maxOrder + 1 : incomingOrder);

        Budget saved = budgetRepository.save(entity);

        return new BudgetDto(
            saved.getBgIdx(), 
            saved.getName(),
            saved.getBudget(),
            saved.getManager(),
            saved.getMemo(),
            saved.getSpent(),
            saved.getSortOrder()
        );
    }


    @Override
    public void deleteBudget(Long bgIdx) {
    	 if (budgetRepository.existsById(bgIdx)) {
    	        budgetRepository.deleteById(bgIdx);
    	    } else {
    	        System.out.println("🔍 삭제 실패 - 존재하지 않는 예산 ID: " + bgIdx);
    	    }
    }
}
