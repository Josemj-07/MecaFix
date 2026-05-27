package com.mecafix.application.service.usecase.updateservice;

import java.math.BigDecimal;

public record UpdateServiceCommand(
        String serviceId,
        String description,
        BigDecimal laborPrice) {
}
