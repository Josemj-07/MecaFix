package com.mecafix.domain.model.valueobject;

import org.junit.jupiter.api.Test;

import com.mecafix.domain.exceptions.InvalidEmailException;
import com.mecafix.domain.exceptions.InvalidMobilePhoneException;
import com.mecafix.domain.exceptions.InvalidNationalIdException;

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
        assertThrows(InvalidEmailException.class, () -> new Email("invalid-email"));
    }

    @Test
    void testMobilePhone_ValidPhone() {
        MobilePhone phone = new MobilePhone("+1234567890");
        assertEquals("+1234567890", phone.mobilePhone());
    }

    @Test
    void testMobilePhone_InvalidPhone() {
        assertThrows(InvalidMobilePhoneException.class, () -> new MobilePhone("+571234asdb"));
    }

    @Test
    void testDni_ValidDni() {
        Dni dni = new Dni("12345678");
        assertEquals("12345678", dni.dni());
    }

    @Test
    void testDni_InvalidDni() {
        assertThrows(InvalidNationalIdException.class, () -> new Dni("A12"));
    }
}
