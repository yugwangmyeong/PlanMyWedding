package com.smhrd.myapp.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.smhrd.myapp.User.User;
import com.smhrd.myapp.entity.Community;

public interface CommunityRepository extends JpaRepository<Community, Long> {

    @Query("SELECT c FROM Community c " +
            "WHERE (:region IS NULL OR c.commRegion = :region) " +
            "AND (:category IS NULL OR c.commService = :category)")
     List<Community> findByFilterWithoutSort(
             @Param("region") String region,
             @Param("category") String category);
    
    @Query("SELECT c FROM Community c JOIN c.user u WHERE u.username LIKE :keyword")
    Page<Community> searchByAuthor(@Param("keyword") String keyword, Pageable pageable);

 // 제목 검색: 제목에 대해 LIKE로 검색
    @Query(value = "SELECT * FROM T_COMMUNITY " +
                   "WHERE COMM_TITLE LIKE :keyword", nativeQuery = true)
    Page<Community> searchByTitle(@Param("keyword") String keyword, Pageable pageable);

    // 내용 검색: 내용에 대해 LIKE로 검색
    @Query(value = "SELECT * FROM T_COMMUNITY " +
                   "WHERE COMM_CONTENT LIKE :keyword", nativeQuery = true)
    Page<Community> searchByContent(@Param("keyword") String keyword, Pageable pageable);

    // 제목 + 내용 검색: 제목 또는 내용 중 하나라도 LIKE 조건이면 반환
    @Query(value = "SELECT * FROM T_COMMUNITY " +
                   "WHERE COMM_TITLE LIKE :keyword " +
                   "OR COMM_CONTENT LIKE :keyword", nativeQuery = true)
    Page<Community> searchByTitleOrContent(@Param("keyword") String keyword, Pageable pageable);
    
    List<Community> findByUser(User user);
}
