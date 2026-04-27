package com.mecafix.application.auth.usecase.login;

import com.mecafix.domain.exceptions.InvalidDataException;
import com.mecafix.domain.exceptions.NotFoundException;
import com.mecafix.domain.model.entity.person.authentication.User;
import com.mecafix.domain.port.security.JwtTokenPort;
import com.mecafix.domain.port.user.UserRepositoryPort;
import com.mecafix.domain.port.util.PasswordHasher;

public class LoginUseCase {

    private final UserRepositoryPort userRepository;
    private final PasswordHasher passwordHasher;
    private final JwtTokenPort jwtTokenPort;

    public LoginUseCase(UserRepositoryPort userRepository,
                        PasswordHasher passwordHasher,
                        JwtTokenPort jwtTokenPort) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.jwtTokenPort = jwtTokenPort;
    }

    public LoginResult execute(LoginCommand command) {
        // 1. Find user by email
        User user = userRepository.findByEmail(command.email())
                .orElseThrow(() -> new NotFoundException("User not found with email: " + command.email()));

        // 2. Validate password using the existing password hasher port
        if (!passwordHasher.matches(command.password(), user.getPasswordHash())) {
            throw new InvalidDataException("Invalid credentials");
        }

        // 3. Generate JWT
        String token = jwtTokenPort.generateToken(user);

        // 4. Return the token
        return new LoginResult(token);
    }
}
