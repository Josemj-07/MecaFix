package com.mecafix.domain.port.payment;

import com.mecafix.domain.model.entity.payment.Payment;

import java.util.Optional;
import java.util.UUID;

public interface PaymentRepositoryPort {
    void save(Payment payment);

    Optional<Payment> findById(UUID id);
}
