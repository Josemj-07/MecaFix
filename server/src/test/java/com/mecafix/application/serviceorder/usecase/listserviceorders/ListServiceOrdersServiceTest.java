package com.mecafix.application.serviceorder.usecase.listserviceorders;

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
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ListServiceOrdersServiceTest {

    @Mock
    private ServiceOrderRepositoryPort serviceOrderRepository;

    private ListServiceOrdersService listServiceOrdersService;

    @BeforeEach
    void setUp() {
        listServiceOrdersService = new ListServiceOrdersService(serviceOrderRepository);
    }

    @Test
    void execute_ShouldReturnAllServiceOrders() {
        ServiceOrder order = mock(ServiceOrder.class);
        Quote quote = mock(Quote.class);
        
        when(order.getId()).thenReturn(UUID.randomUUID());
        when(order.getQuote()).thenReturn(quote);
        when(quote.getId()).thenReturn(UUID.randomUUID());
        when(order.getOrderStatus()).thenReturn(OrderStatus.CREATED);
        when(order.getCreationDate()).thenReturn(LocalDateTime.now());
        
        when(serviceOrderRepository.findAll()).thenReturn(List.of(order));

        ListServiceOrdersResult result = listServiceOrdersService.execute(new ListServiceOrdersCommand());

        assertEquals(1, result.serviceOrders().size());
    }
}
