package com.mecafix.application.payment.usecase.registerpayment;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record RegisterPaymentResult(
        UUID id,
        UUID serviceOrderId,
        BigDecimal amountToPay,
        BigDecimal amountReceived,
        BigDecimal changeAmount,
        String paymentMethod,
        LocalDateTime date,
        boolean isFullyPaid) {
}
