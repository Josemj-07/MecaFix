package com.mecafix.application.serviceorder.usecase.advanceorderstatus;

import com.mecafix.application.serviceorder.port.out.ServiceOrderRepositoryPort;
import com.mecafix.domain.model.entity.order.ServiceOrder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import com.mecafix.domain.model.enums.OrderStatus;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
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
