package com.mecafix.application.serviceorder.usecase.createserviceorder;

import java.time.LocalDateTime;
import java.util.UUID;

public record CreateServiceOrderResult(
        UUID id,
        UUID quoteId,
        String orderStatus,
        LocalDateTime creationDate) {
}
