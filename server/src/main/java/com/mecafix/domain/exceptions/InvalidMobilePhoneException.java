package com.mecafix.domain.exceptions;

public class InvalidMobilePhoneException extends RuntimeException {
    public InvalidMobilePhoneException(String message) {
        super(message);
    }
}
