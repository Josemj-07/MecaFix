package com.mecafix.application.customer.usecase.getcustomervehicles;

import java.util.List;
import java.util.UUID;

public record GetCustomerVehiclesResult(
        UUID customerId,
        String customerFullName,
        List<VehicleResult> vehicles
) { }
