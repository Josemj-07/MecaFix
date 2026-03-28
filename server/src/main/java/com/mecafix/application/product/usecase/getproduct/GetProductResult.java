package com.mecafix.application.product.usecase.getproduct;

import java.math.BigDecimal;
import java.util.UUID;

public record GetProductResult(
        UUID id,
        String name,
        String description,
        BigDecimal purchasePrice,
        BigDecimal salePrice,
        int stock,
        String categoryName) {
}
