package com.mecafix.application.exceptions;

public class MechanicAlreadyExistsException extends RuntimeException {
    public MechanicAlreadyExistsException(String message) {
        super(message);
    }
}
