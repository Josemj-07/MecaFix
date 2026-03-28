package com.mecafix.application.payment.usecase.getpayment;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record GetPaymentResult(
        UUID id,
        BigDecimal amountToPay,
        BigDecimal amountReceived,
        BigDecimal changeAmount,
        String paymentMethod,
        LocalDateTime date,
        UUID serviceOrderId,
        boolean fullyPaid) {
}
