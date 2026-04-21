package com.mecafix.application.product.usecase.listproducts;

import com.mecafix.application.product.mapper.ProductMapper;
import com.mecafix.application.product.port.out.ProductRepositoryPort;
import com.mecafix.domain.model.entity.product.Product;

import java.util.List;

public class ListProductsService implements ListProductsUseCase {

    private final ProductRepositoryPort productRepository;

    public ListProductsService(ProductRepositoryPort productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public ListProductsResult execute(ListProductsCommand command) {

        List<Product> products = productRepository.findAll();

        return ProductMapper.toListResult(products);
    }
}
