package com.mecafix.infrastructure.config;

import com.mecafix.adapter.out.persistence.entity.UserJpaEntity;
import com.mecafix.adapter.out.persistence.repository.UserJpaRepository;
import com.mecafix.domain.model.enums.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserJpaRepository userJpaRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userJpaRepository.count() == 0) {
            log.info("No users found in database. Seeding default general administrator (OWNER)...");
            
            UserJpaEntity defaultOwner = new UserJpaEntity(
                    UUID.randomUUID(),
                    "admin@mecafix.com",
                    passwordEncoder.encode("admin"),
                    "Administrador General",
                    Role.OWNER
            );
            
            userJpaRepository.save(defaultOwner);
            log.info("Default OWNER seeded successfully!");
            log.info("Email: admin@mecafix.com");
            log.info("Password: admin");
        }
    }
}
