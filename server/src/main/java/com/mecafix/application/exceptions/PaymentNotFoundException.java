package com.mecafix.application.exceptions;

import com.mecafix.domain.exceptions.NotFoundException;

public class PaymentNotFoundException extends NotFoundException {
    public PaymentNotFoundException(String message) {
        super(message);
    }
}
