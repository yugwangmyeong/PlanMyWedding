package com.smhrd.myapp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.myapp.MoneyControl.BudgetDto;
import com.smhrd.myapp.service.BudgetService;
import com.smhrd.myapp.service.CustomUserDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/budget")
public class BudgetController {

    private final BudgetService budgetService;

    @PutMapping("/update/{bgIdx}")
    public ResponseEntity<Void> updateBudget(@PathVariable Long bgIdx, @RequestBody BudgetDto dto) {
        budgetService.updateBudget(bgIdx, dto);
        return ResponseEntity.ok().build();
    }
    
    
    @GetMapping("/list")
    public ResponseEntity<List<BudgetDto>> getBudgetList(@AuthenticationPrincipal CustomUserDetails user)
    {
    		
        Long userId = user.getId(); //사용자 UserId 추출
        List<BudgetDto> budgets = budgetService.getBudgetList(userId); // 🔄 해당 유저의 예산 목록
        return ResponseEntity.ok(budgets);
    }
    
    @PostMapping("/createbudget")
    public ResponseEntity<BudgetDto> createBudget(@RequestBody BudgetDto dto,
                                                 @AuthenticationPrincipal CustomUserDetails user) {
        Long userId = user.getId();
        BudgetDto saved = budgetService.createBudget(dto, userId);
        return ResponseEntity.ok(saved);  // ✅ 저장된 bgIdx 포함해서 리턴
    }



    @DeleteMapping("/deletebudget/{bgIdx}")
    public ResponseEntity<Void> deleteBudget(@PathVariable Long bgIdx) {
        budgetService.deleteBudget(bgIdx);
        return ResponseEntity.ok().build();
    }

}
