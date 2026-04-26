package com.mecafix.domain.exceptions;

public class InvalidEmailException extends InvalidDataException {
    public InvalidEmailException() {
        super("INVALID_EMAIL");
    }

}
