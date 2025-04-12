package com.smhrd.myapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.smhrd.myapp.entity.Community;

public interface CommunityRepository extends JpaRepository<Community, Long> {

    @Query("SELECT c FROM Community c " +
           "WHERE (:region IS NULL OR c.commRegion = :region) " +
           "AND (:category IS NULL OR c.commService = :category) " +
           "ORDER BY " +
           "CASE WHEN :sort = 'popular' THEN c.commLikes " +
           "     WHEN :sort = 'views' THEN c.commViews " +
           "     ELSE c.createdAt END DESC")
    List<Community> findByFilter(
            @Param("region") String region,
            @Param("category") String category,
            @Param("sort") String sort);
}
