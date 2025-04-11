package com.smhrd.myapp.dto;

import lombok.Data;

@Data
public class InviteRequestDTO {
    private String email;

    public InviteRequestDTO() {}

    public InviteRequestDTO(String email) {
        this.email = email;
    }

    
}
