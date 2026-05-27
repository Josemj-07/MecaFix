package com.mecafix.application.exceptions;

import com.mecafix.domain.exceptions.NotFoundException;

public class CategoryNotFoundException extends NotFoundException {
    public CategoryNotFoundException(String message) {
        super(message);
    }
}
