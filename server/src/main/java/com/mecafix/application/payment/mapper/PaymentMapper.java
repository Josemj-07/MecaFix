package com.mecafix.application.payment.mapper;

import com.mecafix.application.payment.usecase.getpayment.GetPaymentResult;
import com.mecafix.application.payment.usecase.validatepayment.ValidatePaymentResult;
import com.mecafix.domain.model.entity.payment.Payment;

public class PaymentMapper {

    private PaymentMapper() {
    }

    public static GetPaymentResult toGetResult(Payment payment) {
        return new GetPaymentResult(
                payment.getId(),
                payment.getAmountToPay(),
                payment.getAmountReceived(),
                payment.getChangeAmount(),
                payment.getPaymentMethod().name(),
                payment.getDate(),
                payment.getServiceOrder().getId(),
                payment.isFullyPaid());
    }

    public static ValidatePaymentResult toValidateResult(Payment payment) {
        boolean fullyPaid = payment.isFullyPaid();
        String message = fullyPaid
                ? "Payment covers the total amount of the service order"
                : "Payment does not cover the total amount of the service order";

        return new ValidatePaymentResult(
                payment.getId(),
                payment.getServiceOrder().getId(),
                payment.getAmountToPay(),
                payment.getAmountReceived(),
                payment.getChangeAmount(),
                fullyPaid,
                message);
    }
}
