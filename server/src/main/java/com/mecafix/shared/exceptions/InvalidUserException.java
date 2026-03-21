package com.mecafix.shared.exceptions;

public class InvalidUserException extends RuntimeException {

    public InvalidUserException() {
        super("INVALID_USER");
    }

}
