package com.smhrd.myapp.User;


import lombok.Data;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Data
public class BudgetInvite {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "inviteId") // ✅ DB 컬럼명과 매핑
    private Long id;

    @ManyToOne
    @JoinColumn(name = "inviter_id")
    private User inviter;

    @ManyToOne
    @JoinColumn(name = "invitee_id")
    private User invitee;

    private String status; // PENDING, ACCEPTED, REJECTED

    private LocalDateTime createdAt;
}
