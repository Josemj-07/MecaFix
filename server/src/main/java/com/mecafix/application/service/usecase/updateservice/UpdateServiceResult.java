package com.mecafix.application.service.usecase.updateservice;

import java.math.BigDecimal;
import java.util.UUID;

public record UpdateServiceResult(
        UUID id,
        String name,
        String description,
        BigDecimal laborPrice) {
}
