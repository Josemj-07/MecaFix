package com.mecafix.shared.exceptions;

public class InvalidEmailException extends RuntimeException {
    public InvalidEmailException() {
        super("INVALID_EMAIL");
    }

}
