package com.mecafix.application.product.usecase.updateproductstock;

import com.mecafix.application.product.mapper.ProductMapper;
import com.mecafix.application.product.port.out.ProductRepositoryPort;
import com.mecafix.domain.model.entity.product.Product;
import com.mecafix.shared.exceptions.ProductNotFoundException;

import java.util.UUID;

public class UpdateProductStockService implements UpdateProductStockUseCase {

    private final ProductRepositoryPort productRepository;

    public UpdateProductStockService(ProductRepositoryPort productRepository) {
        this.productRepository = productRepository;
    }

    @Override
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
