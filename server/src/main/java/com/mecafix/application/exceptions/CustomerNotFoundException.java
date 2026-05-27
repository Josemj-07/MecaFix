package com.mecafix.application.exceptions;

import com.mecafix.domain.exceptions.NotFoundException;

public class CustomerNotFoundException extends NotFoundException {
    public CustomerNotFoundException(String message) {
        super(message);
    }
}
