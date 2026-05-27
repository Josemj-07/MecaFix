package com.mecafix.adapter.out.persistence.repository;

import com.mecafix.adapter.out.persistence.entity.CategoryJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoryJpaRepository extends JpaRepository<CategoryJpaEntity, UUID> {
    boolean existsByName(String name);
}