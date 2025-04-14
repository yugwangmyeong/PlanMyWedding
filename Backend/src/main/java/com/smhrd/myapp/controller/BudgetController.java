package com.smhrd.myapp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
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
import com.smhrd.myapp.User.BudgetInvite;
import com.smhrd.myapp.dto.InviteRequestDTO;
import com.smhrd.myapp.service.BudgetInviteService;
import com.smhrd.myapp.service.BudgetService;
import com.smhrd.myapp.service.CustomUserDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/budget")
public class BudgetController {

    private final BudgetService budgetService;

    private final BudgetInviteService budgetinviteservice;
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
    

    @PostMapping("/invite")
    public ResponseEntity<?> inviteBudgetUser(@RequestBody InviteRequestDTO request,
                                              @AuthenticationPrincipal CustomUserDetails userDetails) {
    	try {
            System.out.println("📩 요청 이메일: " + request.getEmail());
            System.out.println("🧑‍💼 로그인 유저 ID: " + userDetails.getUser().getId()); // 여기가 null이면 문제

            budgetinviteservice.sendInvite(userDetails.getUser().getId(), request.getEmail());
            return ResponseEntity.ok("초대 전송 완료");
        } catch (Exception e) {
            e.printStackTrace(); // ✅ 자세한 오류 로그
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("초대 실패: " + e.getMessage());
        }
    }
    
    @GetMapping("/invites")
    public ResponseEntity<?> getBudgetInvites(@AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            Long userId = userDetails.getUser().getId();
            List<BudgetInvite> invites = budgetinviteservice.getPendingInvitesForUser(userId);
            return ResponseEntity.ok(invites);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("예산 초대 조회 실패: " + e.getMessage());
        }
    }
    
 // BudgetController.java
    @PostMapping("/accept/{inviteId}")
    public ResponseEntity<?> acceptInvite(@PathVariable Long inviteId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
        	budgetinviteservice.acceptInvite(inviteId, userDetails.getUser().getId());
            return ResponseEntity.ok("수락 완료");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("수락 실패: " + e.getMessage());
        }
    }




    
    

}
