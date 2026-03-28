package com.mecafix.application.customer.usecase.getcustomer;

public interface GetCustomerUseCase {
    GetCustomerResult execute(GetCustomerCommand command);
}
