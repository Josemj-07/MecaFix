package com.mecafix.application.payment.mapper;

import com.mecafix.application.payment.usecase.registerpayment.RegisterPaymentResult;
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
}
