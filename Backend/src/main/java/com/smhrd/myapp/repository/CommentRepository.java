package com.smhrd.myapp.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.smhrd.myapp.entity.Comment;
import com.smhrd.myapp.entity.Community;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    
    List<Comment> findByCommunity(Community community);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM Comment c WHERE c.community = :community")
    void deleteByCommunity(@Param("community") Community community);
}
