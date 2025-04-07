package com.smhrd.myapp.LoginRequest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

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
	            .antMatchers("/api/login").permitAll() // ✅ 여기를 antMatchers로!
	            .antMatchers("/api/delete").authenticated() // 🔥 이 경로는 인증 필요
	            .antMatchers(HttpMethod.GET, "/api/member").authenticated()
	            .antMatchers(HttpMethod.PUT, "/api/member").authenticated()
	            .anyRequest().authenticated()
	        .and()
	        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	        .and()
	        .formLogin().disable();

	 // ✅ JWT 필터 등록
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

	    return http.build();
	}
}
