package com.mecafix.application.product.usecase.updateproductprice;

import com.mecafix.application.product.mapper.ProductMapper;
import com.mecafix.domain.model.entity.product.Product;
import com.mecafix.domain.model.valueobject.Price;
import com.mecafix.application.exceptions.ProductNotFoundException;
import com.mecafix.domain.port.product.ProductRepositoryPort;

import java.util.UUID;

public class UpdateProductPriceUseCase {

    private final ProductRepositoryPort productRepository;

    public UpdateProductPriceUseCase(ProductRepositoryPort productRepository) {
        this.productRepository = productRepository;
    }

    public UpdateProductPriceResult execute(UpdateProductPriceCommand command) {

        Product product = productRepository.findById(UUID.fromString(command.productId()))
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id " + command.productId()));

        product.setPrice(new Price(command.purchasePrice(), command.salePrice()));

        productRepository.save(product);

        return ProductMapper.toUpdatePriceResult(product);
    }
}
