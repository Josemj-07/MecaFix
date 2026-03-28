package com.mecafix.domain.model.valueobject;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ValueObjectTests {

    @Test
    void testEmail_ValidEmail() {
        Email email = new Email("test@example.com");
        assertEquals("test@example.com", email.address());
    }

    @Test
    void testEmail_InvalidEmail() {
        assertThrows(IllegalArgumentException.class, () -> new Email("invalid-email"));
    }

    @Test
    void testMobilePhone_ValidPhone() {
        MobilePhone phone = new MobilePhone("1234567890");
        assertEquals("1234567890", phone.mobilePhone());
    }

    @Test
    void testMobilePhone_InvalidPhone() {
        assertThrows(IllegalArgumentException.class, () -> new MobilePhone("123"));
    }

    @Test
    void testDni_ValidDni() {
        Dni dni = new Dni("12345678A");
        assertEquals("12345678A", dni.dni());
    }

    @Test
    void testDni_InvalidDni() {
        assertThrows(IllegalArgumentException.class, () -> new Dni("A12"));
    }
}
