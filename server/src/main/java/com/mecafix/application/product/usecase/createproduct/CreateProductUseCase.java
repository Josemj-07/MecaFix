package com.mecafix.application.product.usecase.createproduct;

import com.mecafix.application.product.mapper.ProductMapper;
import com.mecafix.domain.model.entity.product.Category;
import com.mecafix.domain.model.entity.product.Product;
import com.mecafix.domain.model.valueobject.Price;
import com.mecafix.application.exceptions.CategoryNotFoundException;
import com.mecafix.domain.port.category.CategoryRepositoryPort;
import com.mecafix.domain.port.product.ProductRepositoryPort;

import java.util.UUID;

public class CreateProductUseCase {

    private final ProductRepositoryPort productRepository;
    private final CategoryRepositoryPort categoryRepository;

    public CreateProductUseCase(ProductRepositoryPort productRepository, CategoryRepositoryPort categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public CreateProductResult execute(CreateProductCommand command) {

        Category category = categoryRepository.findById(UUID.fromString(command.categoryId()))
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with id " + command.categoryId()));

        Product product = Product.create(
                command.name(),
                command.description(),
                new Price(command.purchasePrice(), command.salePrice()),
                command.stock(),
                category);

        productRepository.save(product);

        return ProductMapper.toCreateResult(product);
    }
}
