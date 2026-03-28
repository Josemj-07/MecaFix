package com.mecafix.application.customer.usecase.createcustomer;

import java.util.UUID;

public record CreateCustomerResult(
        UUID id,
        String firstName,
        String lastName,
        String email,
        String mobilePhone,
        String dni) {
}
