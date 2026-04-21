package com.mecafix.domain.port.product;

import com.mecafix.domain.model.entity.product.Product;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductRepositoryPort {
    void save(Product product);

    Optional<Product> findById(UUID id);

    List<Product> findAll();
}
