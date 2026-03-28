package com.mecafix.application.payment.mapper;

import com.mecafix.application.payment.usecase.getpayment.GetPaymentResult;
import com.mecafix.application.payment.usecase.registerpayment.RegisterPaymentResult;
import com.mecafix.application.payment.usecase.validatepayment.ValidatePaymentResult;
import com.mecafix.domain.model.entity.payment.Payment;

public class PaymentMapper {

    private PaymentMapper() { }

    public static RegisterPaymentResult toRegisterResult(Payment payment) {
        return new RegisterPaymentResult(
                payment.getId(),
                payment.getServiceOrder().getId(),
                payment.getAmountToPay(),
                payment.getAmountReceived(),
                payment.getChangeAmount(),
                payment.getPaymentMethod().name(),
                payment.getDate(),
                payment.isFullyPaid()
        );
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
                payment.isFullyPaid()
        );
    }

    public static ValidatePaymentResult toValidateResult(Payment payment) {
        String message = payment.isFullyPaid() ? "Payment is fully paid." : "Payment is partially paid.";
        return new ValidatePaymentResult(
                payment.getId(),
                payment.getServiceOrder().getId(),
                payment.getAmountToPay(),
                payment.getAmountReceived(),
                payment.getChangeAmount(),
                payment.isFullyPaid(),
                message
        );
    }
}
