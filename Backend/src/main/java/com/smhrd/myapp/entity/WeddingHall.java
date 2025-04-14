package com.smhrd.myapp.entity;

import java.util.List;

import javax.persistence.Column;
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
    @Column(name = "WH_IDX")
    private Long whIdx;

    @Column(name = "WH_NAME")
    private String whName;
    
    @Column(name = "WH_ADDR")
    private String whAddr;
    
    @Column(name = "WH_TEL")
    private String whTel;
    
    @Column(name = "WH_URL")
    private String whUrl;

    @Column(name = "LAT")
    private Double lat;
    
    @Column(name = "LON")
    private Double lon;

    @Column(name = "WH_IMG1")
    private String whImg1;
    
    @Column(name = "WH_IMG2")
    private String whImg2;
    
    @Column(name = "WH_IMG3")
    private String whImg3;
    
    @Column(name = "CAR_PARK_CT")
    private Integer carParkCt;

    @OneToMany(mappedBy = "weddingHall", fetch = FetchType.LAZY)
    private List<TPrice> prices;
}
