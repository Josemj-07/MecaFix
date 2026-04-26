package com.mecafix.application.exceptions;

import com.mecafix.domain.exceptions.NotFoundException;

public class ServiceNotFoundException extends NotFoundException {
    public ServiceNotFoundException(String message) {
        super(message);
    }
}
