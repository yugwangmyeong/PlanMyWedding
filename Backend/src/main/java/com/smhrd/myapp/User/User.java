package com.smhrd.myapp.User;

import java.util.List;


import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;
    
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

//    @Column(name = "MB_ID") // 기존 테이블에서 ID 컬럼에 맞춤
//    private String email;
//
//    @Column(name = "MB_NICK")
//    private String username;
//
//    @Column(name = "MB_PW")
//    private String password;
    
 // OneToMany 관계 설정: 한 사용자는 여러 개의 일정을 가질 수 있음
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Schedule> schedules; // 사용자의 일정을 조회할 수 있음
}