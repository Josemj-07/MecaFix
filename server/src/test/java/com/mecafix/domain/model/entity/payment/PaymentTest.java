package com.mecafix.domain.model.entity.payment;

import com.mecafix.domain.model.entity.order.ServiceOrder;
import com.mecafix.domain.model.enums.PaymentMethod;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class PaymentTest {

    @Test
    void testCreatePayment_ShouldCalculateCorrectly() {
        ServiceOrder order = mock(ServiceOrder.class);
        com.mecafix.domain.model.entity.quote.Quote quote = mock(com.mecafix.domain.model.entity.quote.Quote.class);
        when(order.getQuote()).thenReturn(quote);
        when(quote.getTotalAmount()).thenReturn(BigDecimal.valueOf(100.0));

        Payment payment = Payment.create(BigDecimal.valueOf(150.0), PaymentMethod.CASH, order);

        assertNotNull(payment.getId());
        assertEquals(BigDecimal.valueOf(100.0), payment.getAmountToPay());
        assertEquals(BigDecimal.valueOf(150.0), payment.getAmountReceived());
        assertEquals(BigDecimal.valueOf(50.0), payment.getChangeAmount());
        assertEquals(PaymentMethod.CASH, payment.getPaymentMethod());
        assertNotNull(payment.getDate());
        assertTrue(payment.isFullyPaid());
    }
}
