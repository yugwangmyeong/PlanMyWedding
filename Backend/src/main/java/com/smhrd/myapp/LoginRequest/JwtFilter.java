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
	         String token = authHeader.substring(7).trim();

	         if (!token.isEmpty() && !"null".equals(token)) {
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
	             System.out.println("❗ 토큰이 비어있음 또는 'null'");
	         }

	     } else {
	         System.out.println("❗ Authorization 헤더 없음 또는 Bearer 형식 아님");
	     }

	     filterChain.doFilter(request, response);
	 }

}