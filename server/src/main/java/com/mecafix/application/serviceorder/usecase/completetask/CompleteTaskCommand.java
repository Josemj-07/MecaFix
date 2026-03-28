package com.mecafix.application.serviceorder.usecase.completetask;

public record CompleteTaskCommand(
        String serviceOrderId,
        String taskId) {
}
