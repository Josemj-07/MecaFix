package com.mecafix.application.service.usecase.getservice;

import java.math.BigDecimal;
import java.util.UUID;

public record GetServiceResult(
        UUID id,
        String name,
        String description,
        BigDecimal laborPrice) {
}
