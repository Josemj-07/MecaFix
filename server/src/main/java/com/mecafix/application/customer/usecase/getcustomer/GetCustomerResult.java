package com.mecafix.application.customer.usecase.getcustomer;

import java.util.UUID;

public record GetCustomerResult(
        UUID id,
        String firstName,
        String lastName,
        String email,
        String mobilePhone,
        String dni) {
}
