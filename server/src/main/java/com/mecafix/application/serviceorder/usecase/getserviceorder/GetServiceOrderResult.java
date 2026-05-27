package com.mecafix.application.serviceorder.usecase.getserviceorder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record GetServiceOrderResult(
        UUID id,
        UUID quoteId,
        String orderStatus,
        LocalDateTime creationDate,
        List<TaskResult> tasks) {
    public record TaskResult(
            UUID id,
            String mechanicName,
            String serviceName,
            String status) {
    }
}
