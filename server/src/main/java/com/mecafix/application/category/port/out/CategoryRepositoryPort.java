package com.mecafix.application.category.port.out;

import com.mecafix.domain.model.entity.product.Category;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CategoryRepositoryPort {
    void save(Category category);

    boolean existsByName(String name);

    Optional<Category> findById(UUID id);

    List<Category> findAll();
}
