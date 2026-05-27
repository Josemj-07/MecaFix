package com.mecafix.application.exceptions;

import com.mecafix.domain.exceptions.NotFoundException;

public class QuoteNotFoundException extends NotFoundException {
    public QuoteNotFoundException(String message) {
        super(message);
    }
}
