package com.smhrd.myapp.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "T_WEDDING_HALL")
@Getter
@Setter
public class WeddingHall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long whIdx;

    private String whName;
    private String whAddr;
    private String whTel;
    private String whUrl;

    private Double lat;
    private Double lon;

    private String whImg1;
    private String whImg2;
    private String whImg3;

    @OneToMany(mappedBy = "weddingHall", fetch = FetchType.LAZY)
    private List<TPrice> prices;
}
