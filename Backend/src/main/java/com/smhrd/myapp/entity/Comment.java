// com.smhrd.myapp.entity.Comment.java
package com.smhrd.myapp.entity;

import lombok.*;
import javax.persistence.*;

import com.smhrd.myapp.User.User;

import java.sql.Timestamp;

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

//    @Column(name = "MB_ID")
//    private String mbId;

    @Column(name = "CONTENT")
    private String content;

    @Column(name = "CREATED_AT")
    private Timestamp createdAt;
    
    //추가: 작성자(User)와 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false) // users 테이블의 id를 참조
    private User user;
}
