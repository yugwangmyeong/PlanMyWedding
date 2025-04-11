package com.smhrd.myapp.User;

import javax.persistence.*;

import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "t_invitation")
public class Invitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inviteId;

    private Long inviterId;     // 초대한 사람
    private Long inviteeId;     // 초대받은 사람
    private String status;      // PENDING / ACCEPTED / REJECTED
    private LocalDateTime createdAt;

    public Invitation() {}

    

   
}
