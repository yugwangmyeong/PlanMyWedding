package com.smhrd.myapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smhrd.myapp.entity.Community;

import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    List<Community> findAllByOrderByCommIdxDesc();
}