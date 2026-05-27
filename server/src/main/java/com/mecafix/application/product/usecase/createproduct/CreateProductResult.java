package com.mecafix.application.product.usecase.createproduct;

import java.math.BigDecimal;
import java.util.UUID;

public record CreateProductResult(
        UUID id,
        String name,
        String description,
        BigDecimal purchasePrice,
        BigDecimal salePrice,
        int stock,
        String categoryName) {
}
