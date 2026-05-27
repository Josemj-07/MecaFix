package com.mecafix.domain.model.entity.person;

import com.mecafix.domain.model.valueobject.Email;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class CustomerTest {

    @Test
    void testCreateCustomer_ShouldCreateSuccessfully() {
        Customer customer = Customer.create("John", "Doe", "john@doe.com", "+1234567890",
                "12345678", new ArrayList<>());

        assertNotNull(customer.getId());
        assertEquals("John", customer.getFirstName());
        assertEquals("Doe", customer.getLastName());
        assertEquals("john@doe.com", customer.getEmail().address());
        assertEquals("+1234567890", customer.getMobilePhone().mobilePhone());
        assertEquals("12345678", customer.getDni().dni());
    }

    @Test
    void testChangeEmail_ShouldUpdateEmail() {
        Customer customer = Customer.create("John", "Doe", "old@doe.com", "+1234567890",
                "12345678", new ArrayList<>());

        customer.changeEmail(new Email("new@doe.com"));

        assertEquals("new@doe.com", customer.getEmail().address());
    }
}

