package com.mecafix.domain.model.valueobject;

import com.mecafix.domain.exceptions.InvalidPriceException;

import java.math.BigDecimal;

public record Price(BigDecimal purchasePrice, BigDecimal salePrice) {
    public Price {
        if (purchasePrice == null || salePrice == null || purchasePrice.compareTo(BigDecimal.ZERO) < 0
                || salePrice.compareTo(BigDecimal.ZERO) < 0 || salePrice.compareTo(purchasePrice) < 0) {
            throw new InvalidPriceException();
        }
    }
}
