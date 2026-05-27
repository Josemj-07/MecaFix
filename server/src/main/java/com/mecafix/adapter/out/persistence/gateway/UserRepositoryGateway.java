package com.mecafix.adapter.out.persistence.gateway;

import com.mecafix.adapter.out.persistence.mapper.UserMapper;
import com.mecafix.adapter.out.persistence.repository.UserJpaRepository;
import com.mecafix.domain.model.entity.person.authentication.User;
import com.mecafix.domain.port.user.UserRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UserRepositoryGateway implements UserRepositoryPort {

    private final UserJpaRepository userJpaRepository;

    @Override
    public void save(User user) {
        userJpaRepository.save(UserMapper.toPersistence(user));
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userJpaRepository.findByEmail(email)
                .map(UserMapper::toDomain);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userJpaRepository.existsByEmail(email);
    }
}
