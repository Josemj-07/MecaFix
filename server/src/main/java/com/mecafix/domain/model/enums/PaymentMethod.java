package com.mecafix.domain.model.enums;

public enum PaymentMethod {
    CASH("Cash"), TRANSFER("Transfer");

    private final String paymentMethod;

    private PaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentMethod() {
        return this.paymentMethod;
    }
}