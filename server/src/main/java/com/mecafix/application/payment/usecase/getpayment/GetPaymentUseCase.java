package com.mecafix.application.payment.usecase.getpayment;

import com.mecafix.application.payment.mapper.PaymentMapper;
import com.mecafix.application.payment.port.out.PaymentRepositoryPort;
import com.mecafix.domain.model.entity.payment.Payment;
import com.mecafix.shared.exceptions.PaymentNotFoundException;

import java.util.UUID;

public class GetPaymentService implements GetPaymentUseCase {

    private final PaymentRepositoryPort paymentRepository;

    public GetPaymentService(PaymentRepositoryPort paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Override
    public GetPaymentResult execute(GetPaymentCommand command) {

        Payment payment = paymentRepository.findById(UUID.fromString(command.paymentId()))
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found with id " + command.paymentId()));

        return PaymentMapper.toGetResult(payment);
    }
}
