package com.mecafix.application.customer.usecase.updatecustomer;

import java.util.UUID;

public record UpdateCustomerResult(
        UUID id,
        String firstName,
        String lastName,
        String email,
        String mobilePhone,
        String dni) {
}
