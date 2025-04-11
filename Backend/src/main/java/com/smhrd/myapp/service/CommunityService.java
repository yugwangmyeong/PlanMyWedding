package com.smhrd.myapp.service;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.stereotype.Service;

import com.smhrd.myapp.User.User;
import com.smhrd.myapp.dto.CommunityDto;
import com.smhrd.myapp.dto.CommunityFilterDto;
import com.smhrd.myapp.entity.Community;
import com.smhrd.myapp.repository.CommunityRepository;
import com.smhrd.myapp.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort; 

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;

    public List<Community> findAllPosts() {
        return communityRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public List<Community> filterPosts(CommunityFilterDto filter) {
        return communityRepository.findByFilter(
            filter.getRegion(),
            filter.getCategory(),
            filter.getSort()
        );
    }

    public Community getPostById(Long id) {
        return communityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("게시글 없음"));
    }

    public Community createPost(CommunityDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("사용자 없음"));

        Community post = Community.builder()
                .commTitle(dto.getCommTitle())
                .commContent(dto.getCommContent())
                .commFile(dto.getCommFile())
                .commService(dto.getCommService())
                .commRegion(dto.getCommRegion())
                .commLikes(0)
                .commViews(0)
                .createdAt(new Timestamp(System.currentTimeMillis()))
                .user(user)
                .build();

        return communityRepository.save(post);
    }

    public Community updatePost(Long id, CommunityDto dto) {
        Community post = getPostById(id);

        post.setCommTitle(dto.getCommTitle());
        post.setCommContent(dto.getCommContent());
        post.setCommFile(dto.getCommFile());
        post.setCommService(dto.getCommService());
        post.setCommRegion(dto.getCommRegion());

        return communityRepository.save(post);
    }

    public void deletePost(Long id) {
        communityRepository.deleteById(id);
    }
}
