package com.mecafix.domain.model.entity.person;

import com.mecafix.domain.model.valueobject.Dni;
import com.mecafix.domain.model.valueobject.Email;
import com.mecafix.domain.model.valueobject.MobilePhone;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class CustomerTest {

    @Test
    void testCreateCustomer_ShouldCreateSuccessfully() {
        Customer customer = Customer.create("John", "Doe", new Email("john@doe.com"), new MobilePhone("+1234567890"),
                new Dni("12345678"));

        assertNotNull(customer.getId());
        assertEquals("John", customer.getFirstName());
        assertEquals("Doe", customer.getLastName());
        assertEquals("john@doe.com", customer.getEmail().address());
        assertEquals("+1234567890", customer.getMobilePhone().mobilePhone());
        assertEquals("12345678", customer.getDni().dni());
    }

    @Test
    void testChangeEmail_ShouldUpdateEmail() {
        Customer customer = Customer.create("John", "Doe", new Email("old@doe.com"), new MobilePhone("+1234567890"),
                new Dni("12345678"));

        customer.changeEmail(new Email("new@doe.com"));

        assertEquals("new@doe.com", customer.getEmail().address());
    }
}
