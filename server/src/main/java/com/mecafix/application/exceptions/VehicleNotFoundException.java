package com.mecafix.application.exceptions;

import com.mecafix.domain.exceptions.NotFoundException;

public class VehicleNotFoundException extends NotFoundException {
    public VehicleNotFoundException(String message) {
        super(message);
    }
}
