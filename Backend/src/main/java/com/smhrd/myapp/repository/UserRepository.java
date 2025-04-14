package com.smhrd.myapp.repository;

import com.smhrd.myapp.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findById(Long userId);
    Optional<User> findByUsername(String username);
    void deleteUserByEmail(String email);
}
