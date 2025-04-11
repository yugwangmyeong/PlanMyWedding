package com.smhrd.myapp.User;

import javax.persistence.*;

import lombok.Data;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Data
@Table(name = "schedule_shared_user")
@IdClass(ScheduleSharedUserId.class)
public class ScheduleSharedUser implements Serializable {

    @Id
    private Long scheIdx;

    @Id
    private Long userId;

    public ScheduleSharedUser() {}

    public ScheduleSharedUser(Long scheIdx, Long userId) {
        this.scheIdx = scheIdx;
        this.userId = userId;
    }

}
