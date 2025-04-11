package com.smhrd.myapp.entity;

import java.sql.Timestamp;

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

    @Column(name = "MB_ID")
    private String mbId;
}
