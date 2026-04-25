package com.mecafix.application.serviceorder.usecase.completetask;

import com.mecafix.application.serviceorder.mapper.ServiceOrderMapper;
import com.mecafix.domain.model.entity.order.ServiceOrder;
import com.mecafix.domain.model.entity.order.Task;
import com.mecafix.application.exceptions.ServiceOrderNotFoundException;
import com.mecafix.application.exceptions.TaskNotFoundException;
import com.mecafix.domain.port.serviceorder.ServiceOrderRepositoryPort;

import java.util.UUID;

public class CompleteTaskUseCase {

    private final ServiceOrderRepositoryPort serviceOrderRepository;

    public CompleteTaskUseCase(ServiceOrderRepositoryPort serviceOrderRepository) {
        this.serviceOrderRepository = serviceOrderRepository;
    }

    public CompleteTaskResult execute(CompleteTaskCommand command) {
        ServiceOrder serviceOrder = serviceOrderRepository.findById(UUID.fromString(command.serviceOrderId()))
                .orElseThrow(() -> new ServiceOrderNotFoundException("Service order not found with id " + command.serviceOrderId()));

        Task taskToComplete = serviceOrder.getTasks().stream()
                .filter(task -> task.getId().equals(UUID.fromString(command.taskId())))
                .findFirst()
                .orElseThrow(() -> new TaskNotFoundException("Task not found with id " + command.taskId()));

        taskToComplete.markFinished();

        serviceOrderRepository.save(serviceOrder);

        return ServiceOrderMapper.toCompleteTaskResult(taskToComplete);
    }
}
