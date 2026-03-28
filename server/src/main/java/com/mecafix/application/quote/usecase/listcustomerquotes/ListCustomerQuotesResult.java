package com.mecafix.application.quote.usecase.listcustomerquotes;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record ListCustomerQuotesResult(
        List<QuoteSummaryResult> quotes) {
    public record QuoteSummaryResult(
            UUID id,
            UUID vehicleId,
            String vehiclePlate,
            String status,
            BigDecimal totalAmount,
            LocalDateTime createdDate) {
    }
}
