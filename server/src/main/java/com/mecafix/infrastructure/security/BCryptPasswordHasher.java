package com.mecafix.infrastructure.security;

import com.mecafix.domain.port.util.PasswordHasher;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class BCryptPasswordHasher implements PasswordHasher {

    private final BCryptPasswordEncoder encoder;

    public BCryptPasswordHasher(BCryptPasswordEncoder encoder) {
        this.encoder = encoder;
    }

    @Override
    public String hash(String password) {
        return encoder.encode(password);
    }

    @Override
    public boolean matches(String rawPassword, String passwordHashed) {
        return encoder.matches(rawPassword, passwordHashed);
    }
}
