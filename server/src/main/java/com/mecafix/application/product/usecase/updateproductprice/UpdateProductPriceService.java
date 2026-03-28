package com.mecafix.application.product.usecase.updateproductprice;

import com.mecafix.application.product.mapper.ProductMapper;
import com.mecafix.application.product.port.out.ProductRepositoryPort;
import com.mecafix.domain.model.entity.product.Product;
import com.mecafix.domain.model.valueobject.Price;
import com.mecafix.shared.exceptions.ProductNotFoundException;

import java.util.UUID;

public class UpdateProductPriceService implements UpdateProductPriceUseCase {

    private final ProductRepositoryPort productRepository;

    public UpdateProductPriceService(ProductRepositoryPort productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public UpdateProductPriceResult execute(UpdateProductPriceCommand command) {

        Product product = productRepository.findById(UUID.fromString(command.productId()))
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id " + command.productId()));

        product.setPrice(new Price(command.purchasePrice(), command.salePrice()));

        productRepository.save(product);

        return ProductMapper.toUpdatePriceResult(product);
    }
}
