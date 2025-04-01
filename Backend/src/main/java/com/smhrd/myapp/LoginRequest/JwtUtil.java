package com.smhrd.myapp.LoginRequest;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil{
    private static final String SECRET_KEY = "my_super_secret_key_12345";

    public static String generateToken(String usernameOrEmail,String username) {
        return Jwts.builder()
        		.setHeaderParam("typ", "JWT")
                .setSubject(usernameOrEmail)
                .claim("username", username) // ✅ 닉네임 claim 추가
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1시간
                
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY.getBytes(StandardCharsets.UTF_8)) // ✅ UTF-8
                .compact();
    }

    public static String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public static boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}