package com.smhrd.myapp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "T_PRICE")
@Getter
@Setter
public class TPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PRICE_IDX")
    private Long priceIdX;
    
    @Column(name = "WED_CATEGORY")
    private String wedCategory;
    
    @Column(name = "WED_TIME")
    private String wedTime;
    
    @Column(name = "RENTAL_FEE")
    private int rentalFee;
    
    @Column(name = "BASIC_CNT")
    private int basicCnt;
    
    @Column(name = "FOOD_PRICE")
    private int foodPrice;
    
    @Column(name = "HALL_NAME")
    private String hallName;
    
    @Column(name = "ADDITION_FEE")
    private int additionFee;

    @ManyToOne
    @JoinColumn(name = "WH_IDX")
    private WeddingHall weddingHall;
}