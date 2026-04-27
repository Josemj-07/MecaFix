package com.mecafix.adapter.out.persistence.gateway;

import com.mecafix.adapter.out.persistence.mapper.CategoryMapper;
import com.mecafix.adapter.out.persistence.repository.CategoryJpaRepository;
import com.mecafix.domain.model.entity.product.Category;
import com.mecafix.domain.port.category.CategoryRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class CategoryRepositoryGateway implements CategoryRepositoryPort {

    private final CategoryJpaRepository categoryJpaRepository;

    @Override
    public void save(Category category) {
        categoryJpaRepository.save(CategoryMapper.toPersistence(category));
    }

    @Override
    public boolean existsByName(String name) {
        return categoryJpaRepository.existsByName(name);
    }

    @Override
    public Optional<Category> findById(UUID id) {
        return categoryJpaRepository.findById(id)
                .map(CategoryMapper::toDomain);
    }

    @Override
    public List<Category> findAll() {
        return categoryJpaRepository.findAll().stream()
                .map(CategoryMapper::toDomain)
                .toList();
    }
}
