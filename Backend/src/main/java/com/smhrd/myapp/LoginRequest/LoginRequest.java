package com.smhrd.myapp.LoginRequest;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
	private String username;
    private String email;
    private String password;
    
    
    private Long userId;
}