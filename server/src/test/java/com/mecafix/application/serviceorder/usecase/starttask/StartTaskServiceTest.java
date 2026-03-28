package com.mecafix.application.serviceorder.usecase.starttask;

import com.mecafix.application.serviceorder.port.out.ServiceOrderRepositoryPort;
import com.mecafix.domain.model.entity.order.ServiceOrder;
import com.mecafix.domain.model.entity.order.Task;
import com.mecafix.domain.model.enums.TaskStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.mock;

@ExtendWith(MockitoExtension.class)
class StartTaskServiceTest {

    @Mock
    private ServiceOrderRepositoryPort serviceOrderRepository;

    private StartTaskService startTaskService;

    @BeforeEach
    void setUp() {
        startTaskService = new StartTaskService(serviceOrderRepository);
    }

    @Test
    void execute_ShouldMarkTaskInProgress_WhenItExists() {
        ServiceOrder order = mock(ServiceOrder.class);
        Task task = mock(Task.class);
        UUID taskId = UUID.randomUUID();
        UUID orderId = UUID.randomUUID();
        
        when(task.getId()).thenReturn(taskId);
        when(task.getStatus()).thenReturn(TaskStatus.IN_PROGRESS);
        when(order.getTasks()).thenReturn(List.of(task));
        
        when(serviceOrderRepository.findById(orderId)).thenReturn(Optional.of(order));

        startTaskService.execute(new StartTaskCommand(orderId.toString(), taskId.toString()));

        verify(task).markInProgress();
        verify(serviceOrderRepository).save(order);
    }
}
