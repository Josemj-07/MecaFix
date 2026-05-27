package com.mecafix.domain.port.user;

import com.mecafix.domain.model.entity.person.authentication.User;

import java.util.Optional;

public interface UserRepositoryPort {
    void save(User user);

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
