package com.mecafix.domain.model.entity.order;

import com.mecafix.domain.model.entity.quote.Quote;
import com.mecafix.domain.model.enums.OrderStatus;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;

class ServiceOrderTest {

    @Test
    void testCreateServiceOrder_ShouldInitializeInCreatedState() {
        Quote quote = mock(Quote.class);
        Task task = mock(Task.class);

        ServiceOrder order = ServiceOrder.create(quote, List.of(task));

        assertNotNull(order.getId());
        assertEquals(quote, order.getQuote());
        assertEquals(1, order.getTasks().size());
        assertEquals(OrderStatus.CREATED, order.getOrderStatus());
        assertNotNull(order.getCreationDate());
    }

    @Test
    void testAdvanceOrderStatus_ShouldFollowTransitions() {
        Quote quote = mock(Quote.class);
        ServiceOrder order = ServiceOrder.create(quote, List.of());

        assertEquals(OrderStatus.CREATED, order.getOrderStatus());
        
        order.advanceOrderStatus();
        assertEquals(OrderStatus.IN_PROGRESS, order.getOrderStatus());
        
        order.advanceOrderStatus();
        assertEquals(OrderStatus.FINALIZED, order.getOrderStatus());
        
        order.advanceOrderStatus();
        assertEquals(OrderStatus.DELIVERED, order.getOrderStatus());
    }
}
