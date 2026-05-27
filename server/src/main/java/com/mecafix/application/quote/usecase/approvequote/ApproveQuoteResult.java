package com.mecafix.application.quote.usecase.approvequote;

import java.math.BigDecimal;
import java.util.UUID;

public record ApproveQuoteResult(
        UUID id,
        String status,
        BigDecimal totalAmount) {
}
