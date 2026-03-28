package com.mecafix.application.quote.usecase.additemtoquote;

import java.math.BigDecimal;
import java.util.UUID;

public record AddItemToQuoteResult(
        UUID quoteId,
        String status,
        BigDecimal totalAmount,
        int totalItems) {
}
