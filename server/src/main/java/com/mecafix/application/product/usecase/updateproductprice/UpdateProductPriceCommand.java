package com.mecafix.application.product.usecase.updateproductprice;

import java.math.BigDecimal;

public record UpdateProductPriceCommand(
        String productId,
        BigDecimal purchasePrice,
        BigDecimal salePrice) {
}
