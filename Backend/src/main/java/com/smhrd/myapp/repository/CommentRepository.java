package com.smhrd.myapp.repository;

import com.smhrd.myapp.entity.Comment;
import com.smhrd.myapp.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByCommunity(Community community); 
}