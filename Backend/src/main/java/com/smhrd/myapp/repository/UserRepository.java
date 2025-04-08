package com.smhrd.myapp.repository;

import com.smhrd.myapp.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
<<<<<<< HEAD
    Optional<User> findByEmail(String email);
=======
	Optional<User> findByEmail(String email);
>>>>>>> 9e504d2 (🌸 PlanMyWedding - JSG 브랜치 초기 업로드)
}