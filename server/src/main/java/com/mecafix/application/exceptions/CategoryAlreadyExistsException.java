package com.mecafix.application.exceptions;

import com.mecafix.domain.exceptions.ConflictException;

public class CategoryAlreadyExistsException extends ConflictException {
    public CategoryAlreadyExistsException(String message) {
        super(message);
    }
}
