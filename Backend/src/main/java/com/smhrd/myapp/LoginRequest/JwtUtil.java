package com.smhrd.myapp.LoginRequest;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtUtil{
    private static final String SECRET_KEY = "my_super_secret_key_12345";

    public static String generateToken(String Email,String username) {
        return Jwts.builder()
        		.setHeaderParam("typ", "JWT")
                .setSubject(Email)
                .claim("username", username)
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1시간
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY.getBytes(StandardCharsets.UTF_8)) // ✅ UTF-8
                .compact();
    }

    public static String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                .setSigningKey(SECRET_KEY.getBytes(StandardCharsets.UTF_8)) // ✅ 여기도 동일
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            e.printStackTrace(); // 로그 확인
            return false;
        }
    }
}