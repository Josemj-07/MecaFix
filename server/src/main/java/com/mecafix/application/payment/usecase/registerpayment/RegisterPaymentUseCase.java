package com.mecafix.application.payment.usecase.registerpayment;

import com.mecafix.application.payment.mapper.PaymentMapper;
import com.mecafix.domain.model.entity.order.ServiceOrder;
import com.mecafix.domain.model.entity.payment.Payment;
import com.mecafix.domain.model.enums.PaymentMethod;
import com.mecafix.application.exceptions.ServiceOrderNotFoundException;
import com.mecafix.domain.port.payment.PaymentRepositoryPort;
import com.mecafix.domain.port.serviceorder.ServiceOrderRepositoryPort;

import java.util.UUID;

public class RegisterPaymentUseCase {

    private final PaymentRepositoryPort paymentRepository;
    private final ServiceOrderRepositoryPort serviceOrderRepository;

    public RegisterPaymentUseCase(PaymentRepositoryPort paymentRepository, ServiceOrderRepositoryPort serviceOrderRepository) {
        this.paymentRepository = paymentRepository;
        this.serviceOrderRepository = serviceOrderRepository;
    }

    public RegisterPaymentResult execute(RegisterPaymentCommand command) {
        ServiceOrder serviceOrder = serviceOrderRepository.findById(UUID.fromString(command.serviceOrderId()))
                .orElseThrow(() -> new ServiceOrderNotFoundException("Service order not found with id " + command.serviceOrderId()));

        Payment payment = Payment.create(
                command.amountReceived(),
                PaymentMethod.valueOf(command.paymentMethod()),
                serviceOrder
        );

        paymentRepository.save(payment);

        return PaymentMapper.toRegisterResult(payment);
    }
}
