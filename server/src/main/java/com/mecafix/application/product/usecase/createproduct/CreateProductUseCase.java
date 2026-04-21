package com.mecafix.application.product.usecase.createproduct;

import com.mecafix.application.category.port.out.CategoryRepositoryPort;
import com.mecafix.application.product.mapper.ProductMapper;
import com.mecafix.application.product.port.out.ProductRepositoryPort;
import com.mecafix.domain.model.entity.product.Category;
import com.mecafix.domain.model.entity.product.Product;
import com.mecafix.domain.model.valueobject.Price;
import com.mecafix.shared.exceptions.CategoryNotFoundException;

import java.util.UUID;

public class CreateProductService implements CreateProductUseCase {

    private final ProductRepositoryPort productRepository;
    private final CategoryRepositoryPort categoryRepository;

    public CreateProductService(ProductRepositoryPort productRepository, CategoryRepositoryPort categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
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
