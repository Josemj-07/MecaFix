package com.mecafix.application.exceptions;

import com.mecafix.domain.exceptions.ConflictException;

public class MechanicAlreadyExistsException extends ConflictException {
    public MechanicAlreadyExistsException(String message) {
        super(message);
    }
}
