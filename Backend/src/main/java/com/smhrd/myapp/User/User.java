package com.smhrd.myapp.User;

<<<<<<< HEAD
import javax.persistence.*;
=======
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

>>>>>>> origin/main
import lombok.Data;

@Entity
@Table(name = "T_MEMBER") // 💡 기존에 있는 테이블 이름으로 수정
@Data
public class User {
    @Id
<<<<<<< HEAD
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;
    
    @Column(nullable = false, unique = true)
=======
    @Column(name = "MB_ID") // 기존 테이블에서 ID 컬럼에 맞춤
>>>>>>> origin/main
    private String email;

    @Column(name = "MB_NICK")
    private String username;

    @Column(name = "MB_PW")
    private String password;

    
}