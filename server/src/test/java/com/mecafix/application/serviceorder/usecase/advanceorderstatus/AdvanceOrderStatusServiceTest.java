package com.mecafix.application.serviceorder.usecase.advanceorderstatus;

import com.mecafix.application.serviceorder.port.out.ServiceOrderRepositoryPort;
import com.mecafix.domain.model.entity.order.ServiceOrder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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

    private AdvanceOrderStatusService service;

    @BeforeEach
    void setUp() {
        service = new AdvanceOrderStatusService(serviceOrderRepository);
    }

    @Test
    void execute_ShouldAdvanceStatus() {
        ServiceOrder order = mock(ServiceOrder.class);
        UUID id = UUID.randomUUID();
        when(order.getId()).thenReturn(id);
        
        // Mock the internal logic of advance order returning some string
        // but here we just verify it calls advanceOrderStatus() and save
        
        when(serviceOrderRepository.findById(id)).thenReturn(Optional.of(order));

        AdvanceOrderStatusCommand command = new AdvanceOrderStatusCommand(id.toString());
        
        service.execute(command);

        verify(order).advanceOrderStatus();
        verify(serviceOrderRepository).save(any(ServiceOrder.class));
    }
}
