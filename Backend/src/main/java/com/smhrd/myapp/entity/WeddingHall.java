package com.smhrd.myapp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "T_WEDDING_HALL")
@Getter
public class WeddingHall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long whIdx;

    private String whName;
    private String whAddr;
    private String whTel;
    private String whUrl;
    private String whImg1;
    private String whImg2;
    private String whImg3;
    private String createdAt;
    private Double lat;
    private Double lon;

    // 필요에 따라 생성자 추가 가능
}
