package com.mecafix.application.product.port.out;

import com.mecafix.domain.model.entity.product.Product;

import java.util.Optional;
import java.util.UUID;

public interface ProductRepositoryPort {
    Optional<Product> findById(UUID id);
}
