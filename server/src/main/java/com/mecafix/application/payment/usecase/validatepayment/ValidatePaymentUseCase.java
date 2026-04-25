package com.mecafix.application.payment.usecase.validatepayment;

import com.mecafix.application.payment.mapper.PaymentMapper;
import com.mecafix.domain.model.entity.payment.Payment;
import com.mecafix.application.exceptions.PaymentNotFoundException;
import com.mecafix.domain.port.payment.PaymentRepositoryPort;

import java.util.UUID;

public class  ValidatePaymentUseCase {

    private final PaymentRepositoryPort paymentRepository;

    public ValidatePaymentUseCase(PaymentRepositoryPort paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public ValidatePaymentResult execute(ValidatePaymentCommand command) {

        Payment payment = paymentRepository.findById(UUID.fromString(command.paymentId()))
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found with id " + command.paymentId()));

        return PaymentMapper.toValidateResult(payment);
    }
}
