package com.mecafix.application.serviceorder.usecase.starttask;

public record StartTaskCommand(
        String serviceOrderId,
        String taskId) {
}
