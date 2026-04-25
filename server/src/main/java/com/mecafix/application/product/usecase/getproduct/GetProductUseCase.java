package com.mecafix.application.product.usecase.getproduct;

import com.mecafix.application.product.mapper.ProductMapper;
import com.mecafix.domain.model.entity.product.Product;
import com.mecafix.application.exceptions.ProductNotFoundException;
import com.mecafix.domain.port.product.ProductRepositoryPort;

import java.util.UUID;

public class GetProductUseCase {

    private final ProductRepositoryPort productRepository;

    public GetProductUseCase(ProductRepositoryPort productRepository) {
        this.productRepository = productRepository;
    }

    public GetProductResult execute(GetProductCommand command) {

        Product product = productRepository.findById(UUID.fromString(command.productId()))
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id " + command.productId()));

        return ProductMapper.toGetResult(product);
    }
}
