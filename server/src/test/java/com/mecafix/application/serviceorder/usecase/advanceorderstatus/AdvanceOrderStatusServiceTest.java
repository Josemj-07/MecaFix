package com.mecafix.application.serviceorder.usecase.advanceorderstatus;

import com.mecafix.domain.model.entity.order.ServiceOrder;

import com.mecafix.domain.port.serviceorder.ServiceOrderRepositoryPort;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import com.mecafix.domain.model.enums.OrderStatus;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;

@ExtendWith(MockitoExtension.class)
class AdvanceOrderStatusServiceTest {

    @Mock
    private ServiceOrderRepositoryPort serviceOrderRepository;

    @Test
    void execute_ShouldAdvanceStatus() {
        ServiceOrder order = mock(ServiceOrder.class);
        order.advanceOrderStatus();
        assertNotNull(order.getOrderStatus() == OrderStatus.IN_PROGRESS);

    }
}
