package com.mecafix.application.product.usecase.updateproductstock;

import java.math.BigDecimal;
import java.util.UUID;

public record UpdateProductStockResult(
        UUID id,
        String name,
        int stock) {
}
