package com.smhrd.myapp.LoginRequest;

import java.io.IOException;
import java.util.ArrayList;

import javax.crypto.SecretKey;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Jwts;

@Component
public class JwtFilter extends OncePerRequestFilter {

	 private final JwtUtil jwtUtil;
	 private final UserDetailsService userDetailsService;

	 
	 
	 public JwtFilter(JwtUtil jwtUtil,  @Qualifier("customUserDetailsService") UserDetailsService userDetailsService) {
	        this.jwtUtil = jwtUtil;
	        this.userDetailsService = userDetailsService;
	    }
	 

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
                                    throws ServletException, IOException {

    	
    	String authHeader = request.getHeader("Authorization");
    	
    	
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            
         // ✅ null 또는 빈 문자열 방지
            if (token == null || token.trim().isEmpty() || "null".equals(token)) {
                System.out.println("❗ 토큰이 null 또는 비어있음");
                filterChain.doFilter(request, response);
                return;
            }else if (authHeader != null) {
                System.out.println("❗ 잘못된 Authorization 헤더 형식: " + authHeader);
            } else {
                System.out.println("ℹ️ Authorization 헤더 없음 (비로그인 상태의 일반 요청일 수 있음)");
            }
            
            System.out.println("🛠 받은 토큰: " + token);
            
            if (jwtUtil.validateToken(token)) {
                System.out.println("✅ 토큰 유효성 검증 성공");

                String email = jwtUtil.extractUsername(token);
                System.out.println("✅ 이메일 추출: " + email);

                UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                System.out.println("❌ 유효하지 않은 토큰");
            }
        } else {
        	//로그인할때 리다이렉트되면서 헤더에 넣어서 전송하는방식이아니라 이거 뜨는거 상관없음
            System.out.println("❗ Authorization 헤더 없음 또는 Bearer 형식 아님");
        }

        // ✅ 반드시 호출되어야 함 (다음 필터 또는 컨트롤러로 요청 전달)
        filterChain.doFilter(request, response);
    }
}