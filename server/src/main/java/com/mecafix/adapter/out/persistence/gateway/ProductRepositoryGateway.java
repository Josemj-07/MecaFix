package com.mecafix.adapter.out.persistence.gateway;

import com.mecafix.adapter.out.persistence.mapper.CategoryMapper;
import com.mecafix.adapter.out.persistence.mapper.ProductMapper;
import com.mecafix.adapter.out.persistence.repository.CategoryJpaRepository;
import com.mecafix.adapter.out.persistence.repository.ProductJpaRepository;
import com.mecafix.domain.model.entity.product.Category;
import com.mecafix.domain.model.entity.product.Product;
import com.mecafix.domain.port.product.ProductRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class ProductRepositoryGateway implements ProductRepositoryPort {

    private final ProductJpaRepository productJpaRepository;
    private final CategoryJpaRepository categoryJpaRepository;

    @Override
    public void save(Product product) {
        var categoryJpa = categoryJpaRepository.findById(product.getCategory().getId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found for Product"));
        productJpaRepository.save(ProductMapper.toPersistence(product, categoryJpa));
    }

    @Override
    public Optional<Product> findById(UUID id) {
        return productJpaRepository.findById(id)
                .map(productJpa -> {
                    Category category = CategoryMapper.toDomain(productJpa.getCategory());
                    return ProductMapper.toDomain(productJpa, category);
                });
    }

    @Override
    public List<Product> findAll() {
        return productJpaRepository.findAll().stream()
                .map(productJpa -> {
                    Category category = CategoryMapper.toDomain(productJpa.getCategory());
                    return ProductMapper.toDomain(productJpa, category);
                })
                .toList();
    }
}
