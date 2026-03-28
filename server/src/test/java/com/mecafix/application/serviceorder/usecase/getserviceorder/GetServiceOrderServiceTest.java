package com.mecafix.application.serviceorder.usecase.getserviceorder;

import com.mecafix.application.serviceorder.port.out.ServiceOrderRepositoryPort;
import com.mecafix.domain.model.entity.order.ServiceOrder;
import com.mecafix.domain.model.entity.quote.Quote;
import com.mecafix.domain.model.enums.OrderStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GetServiceOrderServiceTest {

    @Mock
    private ServiceOrderRepositoryPort serviceOrderRepository;

    private GetServiceOrderService getServiceOrderService;

    @BeforeEach
    void setUp() {
        getServiceOrderService = new GetServiceOrderService(serviceOrderRepository);
    }

    @Test
    void execute_ShouldReturnServiceOrder() {
        ServiceOrder order = mock(ServiceOrder.class);
        Quote quote = mock(Quote.class);
        UUID id = UUID.randomUUID();
        
        when(order.getId()).thenReturn(id);
        when(order.getQuote()).thenReturn(quote);
        when(quote.getId()).thenReturn(UUID.randomUUID());
        when(order.getOrderStatus()).thenReturn(OrderStatus.CREATED);
        when(order.getCreationDate()).thenReturn(LocalDateTime.now());
        when(order.getTasks()).thenReturn(List.of());
        
        when(serviceOrderRepository.findById(id)).thenReturn(Optional.of(order));

        GetServiceOrderResult result = getServiceOrderService.execute(new GetServiceOrderCommand(id.toString()));

        assertNotNull(result);
    }
}
