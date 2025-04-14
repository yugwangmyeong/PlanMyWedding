package com.smhrd.myapp.MoneyControl;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BudgetInviteDto {
    private Long inviteId;
    private String inviterName;
}
