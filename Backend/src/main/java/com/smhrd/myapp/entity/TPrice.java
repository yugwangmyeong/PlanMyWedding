package com.smhrd.myapp.entity;

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
    private Long id;

    private String wedCategory;
    private String wedTime;
    private int rentalFee;
    private int basicCnt;
    private int foodPrice;
    private String hallName;
    private int additionFee;

    @ManyToOne
    @JoinColumn(name = "wh_idx")
    private WeddingHall weddingHall;
}