package com.mecafix.application.customer.usecase.createcustomer;

public interface CreateCustomerUseCase {
    CreateCustomerResult execute(CreateCustomerCommand command);
}
