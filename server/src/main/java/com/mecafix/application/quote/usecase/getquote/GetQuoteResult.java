package com.mecafix.application.quote.usecase.getquote;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record GetQuoteResult(
        UUID id,
        UUID customerId,
        String customerName,
        UUID vehicleId,
        String vehiclePlate,
        String status,
        BigDecimal totalAmount,
        LocalDateTime createdDate,
        List<PayableItemResult> items) {
    public record PayableItemResult(
            String type,
            String name,
            BigDecimal subtotal) {
    }
}
