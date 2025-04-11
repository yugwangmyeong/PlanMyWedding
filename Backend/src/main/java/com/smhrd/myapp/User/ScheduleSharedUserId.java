package com.smhrd.myapp.User;

import java.io.Serializable;
import java.util.Objects;

public class ScheduleSharedUserId implements Serializable {
    private Long scheIdx;
    private Long userId;

    public ScheduleSharedUserId() {}

    public ScheduleSharedUserId(Long scheIdx, Long userId) {
        this.scheIdx = scheIdx;
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ScheduleSharedUserId)) return false;
        ScheduleSharedUserId that = (ScheduleSharedUserId) o;
        return Objects.equals(scheIdx, that.scheIdx) && Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(scheIdx, userId);
    }
}
