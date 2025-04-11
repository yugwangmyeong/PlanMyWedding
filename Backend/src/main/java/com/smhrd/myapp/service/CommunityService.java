package com.smhrd.myapp.service;

import com.smhrd.myapp.dto.CommunityRequest;
import com.smhrd.myapp.dto.CommunityResponse;
import com.smhrd.myapp.entity.Community;
import com.smhrd.myapp.repository.CommunityRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommunityService {

    @Autowired
    private CommunityRepository communityRepo;

    public List<CommunityResponse> getAllPosts() {
        return communityRepo.findAllByOrderByCommIdxDesc()
                .stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }

    public CommunityResponse createPost(CommunityRequest request) {
        Community post = new Community();
        post.setCommTitle(request.getCommTitle());
        post.setCommContent(request.getCommContent());
        post.setCommFile(request.getCommFile());
        post.setMbId(request.getMbId());
        post.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        post.setCommViews(0);
        post.setCommLikes(0);
        Community saved = communityRepo.save(post);
        return toResponseDto(saved);
    }

    public Optional<CommunityResponse> getPost(Long id) {
        return communityRepo.findById(id).map(this::toResponseDto);
    }

    public Optional<CommunityResponse> updatePost(Long id, CommunityRequest request) {
        return communityRepo.findById(id).map(post -> {
            post.setCommTitle(request.getCommTitle());
            post.setCommContent(request.getCommContent());
            post.setCommFile(request.getCommFile());
            Community updated = communityRepo.save(post);
            return toResponseDto(updated);
        });
    }

    public boolean deletePost(Long id) {
        if (communityRepo.existsById(id)) {
            communityRepo.deleteById(id);
            return true;
        }
        return false;
    }

    private CommunityResponse toResponseDto(Community post) {
        return CommunityResponse.builder()
                .commIdx(post.getCommIdx())
                .commTitle(post.getCommTitle())
                .commContent(post.getCommContent())
                .commFile(post.getCommFile())
                .commViews(post.getCommViews())
                .commLikes(post.getCommLikes())
                .createdAt(post.getCreatedAt())
                .mbId(post.getMbId())
                .build();
    }
}
