package com.smhrd.myapp.MoneyControl;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BudgetDto {
    private Long bgIdx;
    private String name;
    private int budget;
    private String manager;
    private String memo;
    private int spent;  // 지출 금액
    private int sortOrder;
    
}
