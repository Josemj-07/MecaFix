package com.mecafix.application.customer.usecase.updatecustomer;

public record UpdateCustomerCommand(
        String customerId,
        String email,
        String mobilePhone,
        String nationalId) {
}
