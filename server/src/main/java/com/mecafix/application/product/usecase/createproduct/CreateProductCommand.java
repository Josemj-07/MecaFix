package com.mecafix.application.product.usecase.createproduct;

import java.math.BigDecimal;

public record CreateProductCommand(
        String name,
        String description,
        BigDecimal purchasePrice,
        BigDecimal salePrice,
        int stock,
        String categoryId) {
}
