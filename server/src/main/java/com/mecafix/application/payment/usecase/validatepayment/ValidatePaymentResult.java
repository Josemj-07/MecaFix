package com.mecafix.application.payment.usecase.validatepayment;

import java.math.BigDecimal;
import java.util.UUID;

public record ValidatePaymentResult(
        UUID paymentId,
        UUID serviceOrderId,
        BigDecimal amountToPay,
        BigDecimal amountReceived,
        BigDecimal changeAmount,
        boolean fullyPaid,
        String message) {
}
