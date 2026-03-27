package com.mecafix.domain.exceptions;

public class InvalidNationalIdException extends RuntimeException {
    public InvalidNationalIdException(String message) {
        super(message);
    }
}
