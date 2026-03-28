package com.mecafix.application.customer.usecase.listcustomers;

import java.util.List;
import java.util.UUID;

public record ListCustomersResult(
        List<CustomerResult> customers) {
    public record CustomerResult(
            UUID id,
            String firstName,
            String lastName,
            String email,
            String dni) {
    }
}
