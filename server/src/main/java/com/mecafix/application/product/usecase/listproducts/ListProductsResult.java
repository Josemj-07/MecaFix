package com.mecafix.application.product.usecase.listproducts;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record ListProductsResult(
        List<ProductResult> products) {
    public record ProductResult(
            UUID id,
            String name,
            BigDecimal salePrice,
            int stock,
            String categoryName) {
    }
}
