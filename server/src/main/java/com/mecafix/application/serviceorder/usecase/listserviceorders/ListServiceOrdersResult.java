package com.mecafix.application.serviceorder.usecase.listserviceorders;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record ListServiceOrdersResult(
        List<ServiceOrderResult> serviceOrders) {
    public record ServiceOrderResult(
            UUID id,
            UUID quoteId,
            String orderStatus,
            LocalDateTime creationDate) {
    }
}
