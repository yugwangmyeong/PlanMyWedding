// com.smhrd.myapp.entity.Comment.java
package com.smhrd.myapp.entity;

<<<<<<< HEAD
import lombok.*;
import javax.persistence.*;

import com.smhrd.myapp.User.User;

import java.sql.Timestamp;
=======
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
>>>>>>> origin/JSG3

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "T_COMMENT")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMMENT_ID")
    private Long commentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMM_IDX")
    private Community community;

<<<<<<< HEAD
//    @Column(name = "MB_ID")
//    private String mbId;

=======
    @Lob
>>>>>>> origin/JSG3
    @Column(name = "CONTENT")
    private String content;

    @Column(name = "CREATED_AT")
    private Timestamp createdAt;
    
<<<<<<< HEAD
    //추가: 작성자(User)와 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false) // users 테이블의 id를 참조
    private User user;
=======
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;
    
>>>>>>> origin/JSG3
}
