package com.mecafix.application.exceptions;

import com.mecafix.domain.exceptions.ConflictException;

public class VehicleAlreadyExistsException extends ConflictException {
    public VehicleAlreadyExistsException(String message) {
        super(message);
    }
}
