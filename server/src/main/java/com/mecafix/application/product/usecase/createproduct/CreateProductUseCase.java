package com.mecafix.application.product.usecase.createproduct;

public interface CreateProductUseCase {
    CreateProductResult execute(CreateProductCommand command);
}
