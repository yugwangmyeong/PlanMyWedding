package com.smhrd.myapp.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.smhrd.myapp.User.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
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

    @Lob
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
    
    @Column(name = "COMM_SERVICE")
    private String commService;

    @Column(name = "COMM_REGION")
    private String commRegion;
    
    
 // 댓글 수 추가 (기본값 0)
    @Column(name = "COMMENT_COUNT",nullable = false)
    private Integer commentCount = 0;
    
    

    
    
    
    
    
    
    
    
    // ✅ 작성자 (User) 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // ✅ 꼭 있어야 함
    private User user;
    
}
