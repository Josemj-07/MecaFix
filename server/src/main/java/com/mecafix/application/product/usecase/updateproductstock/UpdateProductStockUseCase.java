package com.mecafix.application.product.usecase.updateproductstock;

import com.mecafix.application.product.mapper.ProductMapper;
import com.mecafix.domain.model.entity.product.Product;
import com.mecafix.application.exceptions.ProductNotFoundException;
import com.mecafix.domain.port.product.ProductRepositoryPort;

import java.util.UUID;

public class UpdateProductStockUseCase {

    private final ProductRepositoryPort productRepository;

    public UpdateProductStockUseCase(ProductRepositoryPort productRepository) {
        this.productRepository = productRepository;
    }

    public UpdateProductStockResult execute(UpdateProductStockCommand command) {

        Product product = productRepository.findById(UUID.fromString(command.productId()))
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id " + command.productId()));

        if ("INCREASE".equalsIgnoreCase(command.operation())) {
            product.increaseStock(command.quantity());
        } else if ("DECREASE".equalsIgnoreCase(command.operation())) {
            product.decreaseStock(command.quantity());
        } else {
            throw new IllegalArgumentException("Operation must be INCREASE or DECREASE");
        }

        productRepository.save(product);

        return ProductMapper.toUpdateStockResult(product);
    }
}
