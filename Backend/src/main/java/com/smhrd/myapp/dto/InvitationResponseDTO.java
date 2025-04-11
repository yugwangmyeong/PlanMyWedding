package com.smhrd.myapp.dto;

import lombok.Data;

@Data
public class InvitationResponseDTO {
    private Long inviteId;
    private String inviterName;
    private String status;
    private String createdAt;

    public InvitationResponseDTO() {}

    public InvitationResponseDTO(Long inviteId, String inviterName, String status, String createdAt) {
        this.inviteId = inviteId;
        this.inviterName = inviterName;
        this.status = status;
        this.createdAt = createdAt;
    }

    
}
