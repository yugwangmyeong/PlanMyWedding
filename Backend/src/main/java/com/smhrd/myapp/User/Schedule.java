package com.smhrd.myapp.User;

import lombok.Data;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.time.LocalDate;

@Entity
@Table(name = "t_schedule")
@Data
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheIdx;

    @ManyToOne(fetch = FetchType.LAZY) // User와의 관계
    @JoinColumn(name = "user_id")  // user_id 외래 키
    @JsonManagedReference
    private User user;  // 사용자 엔티티와 연관

    @Column(nullable = false)
    private String scheTitle;

    @Column
    private LocalDate reservedAt;  // 결혼식 날짜

    @Column
    private String scheStatus = "예정";

    @Column
    private String scheCategory = "default";
}
