package com.mecafix.application.customer.usecase.createcustomer;

public record CreateCustomerCommand(
        String firstName,
        String lastName,
        String email,
        String mobilePhone,
        String nationalId) {
}
