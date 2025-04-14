package com.smhrd.myapp.LoginRequest;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	private final JwtFilter jwtFilter;

	public SecurityConfig(JwtFilter jwtFilter) {
		this.jwtFilter = jwtFilter;
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	    http
		    .cors() // ✅ 이것만 추가해주면 위의 설정 Bean이 활성화됨
	        .and()
	        .csrf().disable()
	        .authorizeRequests()
	        	.antMatchers("/api/signup").permitAll() // 👈 이거 필수!!
	            .antMatchers("/api/login").permitAll() // ✅ 여기를 antMatchers로!
	            .antMatchers("/api/delete").authenticated() // 🔥 이 경로는 인증 필요
	            .antMatchers(HttpMethod.GET, "/api/member").authenticated()
	            .antMatchers(HttpMethod.PUT, "/api/member").authenticated()
	            .antMatchers("/api/schedule/wedding").authenticated()
	            .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
               .antMatchers("/wedding-halls/details","/api/community/**").permitAll() // 로그인은 인증 없이 허용
	            
               .antMatchers("/api/community/user/email/**").permitAll()

               .antMatchers("/boot/api/community/**").permitAll()
               .antMatchers("/api/user/email/**").permitAll()
               
               .antMatchers(HttpMethod.GET, "/api/user/find-id").permitAll()
               .antMatchers(HttpMethod.GET, "/api/user/find-password").permitAll()
               
               
               .anyRequest().authenticated()
	        .and()
	        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	        .and()
	        .formLogin().disable();

	 // ✅ JWT 필터 등록
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

	    return http.build();
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
	    CorsConfiguration configuration = new CorsConfiguration();
	    configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", 
	    		"http://192.168.219.50:3000", 
	    	    "http://your-dev-domain.com"));
	    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
	    configuration.setAllowedHeaders(Arrays.asList("*"));
	    configuration.setAllowCredentials(true); // ⚠️ credentials 사용 시 필수

	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", configuration);
	    return source;
	}
	
}