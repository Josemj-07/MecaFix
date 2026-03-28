package com.mecafix.application.serviceorder.usecase.createserviceorder;

import java.util.List;

public record CreateServiceOrderCommand(
        String quoteId,
        List<TaskCommand> tasks) {
    public record TaskCommand(
            String mechanicId,
            String serviceId) {
    }
}
