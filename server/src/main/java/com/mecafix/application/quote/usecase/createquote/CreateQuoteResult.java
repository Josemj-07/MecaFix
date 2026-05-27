package com.mecafix.application.quote.usecase.createquote;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record CreateQuoteResult(
        UUID id,
        UUID customerId,
        String customerName,
        UUID vehicleId,
        String vehiclePlate,
        String status,
        BigDecimal totalAmount,
        LocalDateTime createdDate) {
}
