package com.mecafix.domain.model.entity;

import com.mecafix.shared.exceptions.IllegalPriceException;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record Price(Long idPrice, BigDecimal purchasePrice, BigDecimal salePrice, LocalDateTime registerDate) {

    public Price(Long idPrice, BigDecimal purchasePrice, BigDecimal salePrice) {
        this(idPrice, purchasePrice, salePrice, LocalDateTime.now());
    }

    public Price {
        if(idPrice == null || purchasePrice == null || salePrice == null || idPrice < 0
                || purchasePrice.compareTo(BigDecimal.ZERO) < 0 || salePrice.compareTo(BigDecimal.ZERO) < 0 || registerDate == null) {
            throw new IllegalPriceException();
        }
    }
}

