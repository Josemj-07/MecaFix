package com.mecafix.application.product.usecase.updateproductstock;

public record UpdateProductStockCommand(
        String productId,
        int quantity,
        String operation) {
}
