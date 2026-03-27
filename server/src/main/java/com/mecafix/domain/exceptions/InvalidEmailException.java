package com.mecafix.domain.exceptions;

public class InvalidEmailException extends RuntimeException {
    public InvalidEmailException() {
        super("INVALID_EMAIL");
    }

}
