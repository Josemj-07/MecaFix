package com.mecafix.application.service.usecase.createservice;

import java.math.BigDecimal;
import java.util.UUID;

public record CreateServiceResult(
        UUID id,
        String name,
        String description,
        BigDecimal laborPrice) {
}
