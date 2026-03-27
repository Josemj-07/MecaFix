package com.mecafix.application.customer.usecase.getcustomervehicles;

public interface GetCustomerVehiclesUseCase {
    GetCustomerVehiclesResult execute(GetCustomerVehiclesCommand command);
}