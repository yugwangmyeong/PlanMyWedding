package com.smhrd.myapp.User;

import javax.persistence.*;
<<<<<<< HEAD

=======
>>>>>>> 9e504d2 (🌸 PlanMyWedding - JSG 브랜치 초기 업로드)
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
<<<<<<< HEAD
=======
    private String username;
    
    @Column(nullable = false, unique = true)
>>>>>>> 9e504d2 (🌸 PlanMyWedding - JSG 브랜치 초기 업로드)
    private String email;

    @Column(nullable = false)
    private String password;
}