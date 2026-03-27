package com.mecafix.domain.exceptions;

public class InvalidServiceOrderException extends RuntimeException {
    public InvalidServiceOrderException() {
        super("INVALID_SERVICE_ORDER");
    }
    public InvalidServiceOrderException(String message) {
        super(message);
    }
}