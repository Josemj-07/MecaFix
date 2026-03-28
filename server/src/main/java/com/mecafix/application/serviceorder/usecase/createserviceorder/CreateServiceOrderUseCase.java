package com.mecafix.application.serviceorder.usecase.createserviceorder;

public interface CreateServiceOrderUseCase {
    CreateServiceOrderResult execute(CreateServiceOrderCommand command);
}
