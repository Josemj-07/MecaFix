package com.mecafix.adapter.out.persistence.mapper;

import com.mecafix.adapter.out.persistence.entity.PaymentJpaEntity;
import com.mecafix.adapter.out.persistence.entity.ServiceOrderJpaEntity;
import com.mecafix.domain.model.entity.order.ServiceOrder;
import com.mecafix.domain.model.entity.payment.Payment;

public class PaymentMapper {
    public static PaymentJpaEntity toPersistence(Payment payment, ServiceOrderJpaEntity serviceOrderJpaEntity) {
        return new PaymentJpaEntity(
                payment.getId(), payment.getAmountToPay(), payment.getAmountReceived(),
                payment.getDate(), payment.getPaymentMethod(), serviceOrderJpaEntity
        );
    }

    public static Payment toDomain(PaymentJpaEntity paymentJpaEntity, ServiceOrder serviceOrder) {
        return Payment.reBuild(
                paymentJpaEntity.getId(), paymentJpaEntity.getAmountReceived(),
                paymentJpaEntity.getPaymentMethod(), serviceOrder
        );
    }
}
