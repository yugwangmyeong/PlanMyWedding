package com.smhrd.myapp.repository;

import com.smhrd.myapp.User.ScheduleSharedUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleSharedUserRepository extends JpaRepository<ScheduleSharedUser, Long> {

    boolean existsByScheIdxAndUserId(Long scheIdx, Long userId);
}
