package com.mecafix.domain.port.security;

import com.mecafix.domain.model.entity.person.authentication.User;

/**
 * Port defining the contract for JWT token operations.
 * This keeps the application layer decoupled from any specific JWT library.
 */
public interface JwtTokenPort {
    String generateToken(User user);

    boolean isTokenValid(String token, String username);

    String extractUsername(String token);

    String extractRole(String token);
}
