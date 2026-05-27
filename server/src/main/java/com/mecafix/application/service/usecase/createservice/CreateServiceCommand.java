package com.mecafix.application.service.usecase.createservice;

import java.math.BigDecimal;

public record CreateServiceCommand(
        String name,
        String description,
        BigDecimal laborPrice) {
}
