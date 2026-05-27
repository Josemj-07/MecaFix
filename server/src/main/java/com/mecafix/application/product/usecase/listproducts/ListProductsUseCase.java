package com.mecafix.application.product.usecase.listproducts;

import com.mecafix.application.product.mapper.ProductMapper;
import com.mecafix.domain.model.entity.product.Product;
import com.mecafix.domain.port.product.ProductRepositoryPort;

import java.util.List;

public class  ListProductsUseCase {

    private final ProductRepositoryPort productRepository;

    public ListProductsUseCase(ProductRepositoryPort productRepository) {
        this.productRepository = productRepository;
    }

    public ListProductsResult execute(ListProductsCommand command) {

        List<Product> products = productRepository.findAll();

        return ProductMapper.toListResult(products);
    }
}
