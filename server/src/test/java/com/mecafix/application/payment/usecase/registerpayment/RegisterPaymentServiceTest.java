package com.mecafix.application.payment.usecase.registerpayment;

import com.mecafix.domain.model.entity.order.ServiceOrder;
import com.mecafix.domain.model.entity.payment.Payment;
import com.mecafix.domain.port.payment.PaymentRepositoryPort;
import com.mecafix.domain.port.serviceorder.ServiceOrderRepositoryPort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.mock;

@ExtendWith(MockitoExtension.class)
class RegisterPaymentServiceTest {

    @Mock
    private PaymentRepositoryPort paymentRepository;
    
    @Mock
    private ServiceOrderRepositoryPort serviceOrderRepository;

    private RegisterPaymentUseCase registerPaymentUseCase;

    @BeforeEach
    void setUp() {
        registerPaymentUseCase = new RegisterPaymentUseCase(paymentRepository, serviceOrderRepository);
    }

    @Test
    void execute_ShouldRegisterPaymentAndSave() {
        UUID orderId = UUID.randomUUID();
        ServiceOrder mockOrder = mock(ServiceOrder.class);
        com.mecafix.domain.model.entity.quote.Quote mockQuote = mock(com.mecafix.domain.model.entity.quote.Quote.class);
        when(mockQuote.getTotalAmount()).thenReturn(BigDecimal.valueOf(100));
        
        when(mockOrder.getId()).thenReturn(orderId);
        when(mockOrder.getQuote()).thenReturn(mockQuote);
        
        when(serviceOrderRepository.findById(orderId)).thenReturn(Optional.of(mockOrder));

        RegisterPaymentCommand command = new RegisterPaymentCommand(orderId.toString(), BigDecimal.valueOf(100), "CASH");

        RegisterPaymentResult result = registerPaymentUseCase.execute(command);

        assertNotNull(result.id());
        assertEquals("CASH", result.paymentMethod());
        assertEquals(BigDecimal.valueOf(100), result.amountReceived());

        verify(paymentRepository).save(any(Payment.class));
    }
}
