package com.smhrd.myapp.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smhrd.myapp.User.User;
import com.smhrd.myapp.dto.CommunityDto;
import com.smhrd.myapp.dto.CommunityFilterDto;
import com.smhrd.myapp.dto.CommunitySearchDto;
import com.smhrd.myapp.entity.Community;
import com.smhrd.myapp.entity.CommunityLike;
import com.smhrd.myapp.repository.CommentRepository;
import com.smhrd.myapp.repository.CommunityLikeRepository;
import com.smhrd.myapp.repository.CommunityRepository;
import com.smhrd.myapp.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;
    private final CommunityLikeRepository communityLikeRepository;
    private final CommentRepository commentRepository;
    
    // 게시글 전체 조회 (최신순)
    public List<Community> findAllPosts() {
        return communityRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    // 필터 조회: 필터 조건만 적용한 결과를 가져온 후, sort값에 따라 정렬
    public List<Community> filterPosts(CommunityFilterDto filter) {
        List<Community> posts = communityRepository.findByFilterWithoutSort(
                filter.getRegion(),
                filter.getCategory()
        );

        if ("popular".equalsIgnoreCase(filter.getSort())) {
            posts.sort((a, b) -> b.getCommLikes() - a.getCommLikes());
        } else if ("views".equalsIgnoreCase(filter.getSort())) {
            posts.sort((a, b) -> b.getCommViews() - a.getCommViews());
        } else {
            posts.sort((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()));
        }
        return posts;
    }

    // id로 게시글 조회 (없으면 예외 발생)
    public Community getPostById(Long id) {
        return communityRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("게시글이 존재하지 않습니다."));
    }

    // 게시글 생성
    public Community createPost(CommunityDto dto) {
        User user = userRepository.findById(dto.getUserId())
            .orElseThrow(() -> new RuntimeException("해당 사용자가 존재하지 않습니다."));
        
        Community post = Community.builder()
                .commTitle(dto.getCommTitle())
                .commContent(dto.getCommContent())
                .commFile(dto.getCommFile())
                .commService(dto.getCommService())
                .commRegion(dto.getCommRegion())
                .commentCount(0)
                .commLikes(0)
                .commViews(0)
                .createdAt(new Timestamp(System.currentTimeMillis()))
                .user(user)
                .build();
                
        return communityRepository.save(post);
    }

    // 게시글 업데이트
    public Community updatePost(Long id, CommunityDto dto) {
        Community post = getPostById(id);
        post.setCommTitle(dto.getCommTitle());
        post.setCommContent(dto.getCommContent());
        post.setCommFile(dto.getCommFile());
        post.setCommService(dto.getCommService());
        post.setCommRegion(dto.getCommRegion());
        return communityRepository.save(post);
    }


		// 강제 삭제: 좋아요와 댓글을 먼저 삭제한 후 게시글 삭제
    @Transactional
    public void deleteCommunityForcefully(Long communityId, Long userId) {
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new RuntimeException("게시글이 존재하지 않습니다."));
        // 삭제 권한 확인 (userId가 전달되지 않으면 생략할 수도 있음)
        if (userId != null && (community.getUser() == null || !community.getUser().getId().equals(userId))) {
            throw new RuntimeException("삭제 권한이 없습니다.");
        }
        
        // 1. 좋아요 삭제
        communityLikeRepository.deleteByCommunity(community);
        
        // 2. 댓글 삭제
        commentRepository.deleteByCommunity(community);
        
        // 3. 게시글 삭제
        communityRepository.delete(community);
    }
    
    // 좋아요 토글, 게시글 생성, 업데이트 등 다른 메소드들은 기존 코드와 동일합니다.

    // 게시글 조회수 증가
    public Community increaseViewCount(Long id) {
        Community post = communityRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("게시글이 존재하지 않습니다."));
        post.setCommViews(post.getCommViews() + 1);
        return communityRepository.save(post);
    }

    // 좋아요 토글: 이미 좋아요한 경우 취소, 아니면 좋아요 추가
    @Transactional
    public Community toggleLike(Long communityId, Long userId) {
        Community community = communityRepository.findById(communityId)
            .orElseThrow(() -> new RuntimeException("게시글이 존재하지 않습니다."));
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("사용자가 존재하지 않습니다."));

        Optional<CommunityLike> optionalLike = communityLikeRepository.findByCommunityAndUser(community, user);
        if (optionalLike.isPresent()) {
            // 좋아요 취소
            communityLikeRepository.delete(optionalLike.get());
            community.setCommLikes(community.getCommLikes() - 1);
        } else {
            // 좋아요 추가
            CommunityLike communityLike = CommunityLike.builder()
                    .community(community)
                    .user(user)
                    .build();
            communityLikeRepository.save(communityLike);
            community.setCommLikes(community.getCommLikes() + 1);
        }
        return communityRepository.save(community);
    }
    
    public Page<Community> searchPosts(CommunitySearchDto searchDto) {
        PageRequest pageRequest = PageRequest.of(searchDto.getPage(), searchDto.getSize());
        String pattern = "%" + searchDto.getKeyword() + "%";

        switch (searchDto.getSearchType()) {
            case "author":
                return communityRepository.searchByAuthor(pattern, pageRequest);
            case "title":
                return communityRepository.searchByTitle(pattern, pageRequest);
            case "content":
                return communityRepository.searchByContent(pattern, pageRequest);
            case "title_content":
                return communityRepository.searchByTitleOrContent(pattern, pageRequest);
            default:
                throw new IllegalArgumentException("Invalid search type: " + searchDto.getSearchType());
        }
    }
    
    

}
