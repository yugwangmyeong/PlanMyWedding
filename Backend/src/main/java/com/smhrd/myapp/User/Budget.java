package com.smhrd.myapp.User;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "t_budget")
@Getter 
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BG_IDX")
    private Long bgIdx;

    @Column(name = "ID", nullable = false)
    private Long userId;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "BUDGET", nullable = false)
    private int budget;

    @Column(name = "MANAGER", nullable = false)
    private String manager;

    @Column(name = "MEMO")
    private String memo;

    @Column(name = "SPENT", nullable = false)
    private int spent;
    
    @Column(name = "CREATED_AT", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "sort_order", nullable=false)
    private int sortOrder = 0;
}
