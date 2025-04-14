package com.smhrd.myapp.service;

import com.smhrd.myapp.User.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;

@Getter
public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    // 사용자 ID를 반환합니다.
    public Long getId() {
        return user.getId();
    }

    // 이메일을 username으로 사용
    @Override
    public String getUsername() {
        return user.getEmail();
    }

    // 사용자 별명을 반환합니다.
    public String getNickname() {
        return user.getUsername();
    }

    // 단일 권한 ROLE_USER 반환
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(() -> "ROLE_USER");
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
