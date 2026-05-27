package com.mecafix.domain.exceptions;

public class InvalidUserException extends InvalidDataException {

    public InvalidUserException() {
        super("INVALID_USER");
    }
    public InvalidUserException(String message) {super(message);}
}
