package com.mecafix.application.product.usecase.getproduct;

import com.mecafix.application.product.mapper.ProductMapper;
import com.mecafix.application.product.port.out.ProductRepositoryPort;
import com.mecafix.domain.model.entity.product.Product;
import com.mecafix.shared.exceptions.ProductNotFoundException;

import java.util.UUID;

public class GetProductService implements GetProductUseCase {

    private final ProductRepositoryPort productRepository;

    public GetProductService(ProductRepositoryPort productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public GetProductResult execute(GetProductCommand command) {

        Product product = productRepository.findById(UUID.fromString(command.productId()))
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id " + command.productId()));

        return ProductMapper.toGetResult(product);
    }
}
