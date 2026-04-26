package com.mecafix.application.exceptions;

import com.mecafix.domain.exceptions.NotFoundException;

public class MechanicNotFoundException extends NotFoundException {
    public MechanicNotFoundException(String message) {
        super(message);
    }
}
