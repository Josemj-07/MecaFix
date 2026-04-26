package com.mecafix.application.exceptions;

import com.mecafix.domain.exceptions.NotFoundException;

public class ProductNotFoundException extends NotFoundException {
    public ProductNotFoundException(String message) {
        super(message);
    }
}
