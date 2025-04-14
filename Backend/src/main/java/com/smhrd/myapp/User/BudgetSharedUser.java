package com.smhrd.myapp.User;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


import lombok.*;

@Entity
@Table(name = "budget_shared_user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BudgetSharedUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "budget_id")
    private Long budgetId; // 공유할 예산의 bgIdx

    @Column(name = "user_id")
    private Long userId; // 초대받은 사용자 ID
}
