package com.mecafix.application.service.usecase.listservices;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record ListServicesResult(
        List<ServiceResult> services) {
    public record ServiceResult(
            UUID id,
            String name,
            String description,
            BigDecimal laborPrice) {
    }
}
