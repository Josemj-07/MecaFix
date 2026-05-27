package com.mecafix.domain.model.entity.payment;

import com.mecafix.domain.model.entity.order.ServiceOrder;
import com.mecafix.domain.model.enums.PaymentMethod;
import com.mecafix.domain.exceptions.InvalidPaymentException;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public class Payment {
    private final UUID id;
    private final BigDecimal amountToPay;
    private final BigDecimal amountReceived;
    private final LocalDateTime date;
    private final PaymentMethod paymentMethod;
    private final ServiceOrder serviceOrder;

    public static Payment create(BigDecimal amountReceived, PaymentMethod paymentMethod, ServiceOrder serviceOrder) {
        return new Payment(amountReceived, paymentMethod, serviceOrder);
    }

    public static Payment reBuild(UUID id, BigDecimal amountReceived, PaymentMethod paymentMethod, ServiceOrder serviceOrder) {
        return new Payment(id, amountReceived, paymentMethod, serviceOrder);
    }

    private Payment(BigDecimal amountReceived, PaymentMethod paymentMethod, ServiceOrder serviceOrder) {
        if (amountReceived == null) throw new InvalidPaymentException("Amount must not be null");
        if (amountReceived.compareTo(BigDecimal.ZERO) < 0) throw new InvalidPaymentException("Amount must not be negative");
        if (paymentMethod == null) throw new InvalidPaymentException("Payment method must not be null");
        if (serviceOrder == null) throw new InvalidPaymentException("Service order must not be null");

        this.id = UUID.randomUUID();
        this.paymentMethod = paymentMethod;
        this.amountReceived = amountReceived;
        this.date = LocalDateTime.now();
        this.serviceOrder = serviceOrder;
        this.amountToPay = this.serviceOrder.getQuote().getTotalAmount();
    }

    private Payment(UUID id, BigDecimal amountReceived, PaymentMethod paymentMethod, ServiceOrder serviceOrder) {
        if (amountReceived == null) throw new InvalidPaymentException("Amount must not be null");
        if(id == null) throw new InvalidPaymentException("Amount must not be null");
        if (amountReceived.compareTo(BigDecimal.ZERO) < 0) throw new InvalidPaymentException("Amount must not be negative");
        if (paymentMethod == null) throw new InvalidPaymentException("Payment method must not be null");
        if (serviceOrder == null) throw new InvalidPaymentException("Service order must not be null");

        this.id = id;
        this.paymentMethod = paymentMethod;
        this.amountReceived = amountReceived;
        this.date = LocalDateTime.now();
        this.serviceOrder = serviceOrder;
        this.amountToPay = this.serviceOrder.getQuote().getTotalAmount();
    }

    public UUID getId() {
        return id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public BigDecimal getAmountToPay() {
        return amountToPay;
    }

    public BigDecimal getAmountReceived() {
        return amountReceived;
    }

    public BigDecimal getChangeAmount() {
        return amountReceived.subtract(amountToPay);
    }

    public boolean isFullyPaid() {
        return amountReceived.compareTo(amountToPay) >= 0;
    }

    public ServiceOrder getServiceOrder() {
        return serviceOrder;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Payment)) return false;
        Payment that = (Payment) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}