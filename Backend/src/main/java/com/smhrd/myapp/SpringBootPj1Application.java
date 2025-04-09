package com.smhrd.myapp;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.smhrd.myapp")
public class SpringBootPj1Application {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootPj1Application.class, args);
	}

}
