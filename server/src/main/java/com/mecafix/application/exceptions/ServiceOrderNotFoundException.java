package com.mecafix.application.exceptions;

import com.mecafix.domain.exceptions.NotFoundException;

public class ServiceOrderNotFoundException extends NotFoundException {
    public ServiceOrderNotFoundException(String message) {
        super(message);
    }
}
