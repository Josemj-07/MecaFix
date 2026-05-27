package com.mecafix.application.product.usecase.updateproductprice;

import java.math.BigDecimal;
import java.util.UUID;

public record UpdateProductPriceResult(
        UUID id,
        String name,
        BigDecimal purchasePrice,
        BigDecimal salePrice) {
}
