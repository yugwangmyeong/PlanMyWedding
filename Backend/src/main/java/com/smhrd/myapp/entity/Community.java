package com.smhrd.myapp.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.smhrd.myapp.User.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "T_COMMUNITY")
public class Community {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMM_IDX")
    private Long commIdx;

    @Column(name = "COMM_TITLE")
    private String commTitle;

    @Column(name = "COMM_CONTENT")
    private String commContent;

    @Column(name = "COMM_FILE")
    private String commFile;

    @Column(name = "CREATED_AT")
    private Timestamp createdAt;

    @Column(name = "COMM_VIEWS")
    private int commViews;

    @Column(name = "COMM_LIKES")
    private int commLikes;

    // ✅ 작성자 (User) 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false) // 외래키 컬럼명 설정
    private User user;
    
    
   // @Column(name = "id")
   // private String mbId;
}
