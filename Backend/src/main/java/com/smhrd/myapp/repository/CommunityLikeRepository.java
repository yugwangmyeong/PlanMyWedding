package com.smhrd.myapp.repository;

import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.smhrd.myapp.entity.Community;
import com.smhrd.myapp.entity.CommunityLike;
import com.smhrd.myapp.User.User;

public interface CommunityLikeRepository extends JpaRepository<CommunityLike, Long> {

    Optional<CommunityLike> findByCommunityAndUser(Community community, User user);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM CommunityLike cl WHERE cl.community = :community")
    void deleteByCommunity(@Param("community") Community community);
}
