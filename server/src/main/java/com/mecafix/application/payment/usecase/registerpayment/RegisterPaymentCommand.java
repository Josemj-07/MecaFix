package com.mecafix.application.payment.usecase.registerpayment;

import java.math.BigDecimal;

public record RegisterPaymentCommand(
        String serviceOrderId,
        BigDecimal amountReceived,
        String paymentMethod) {
}
