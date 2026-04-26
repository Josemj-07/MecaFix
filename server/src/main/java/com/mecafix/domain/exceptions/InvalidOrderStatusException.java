package com.mecafix.domain.exceptions;

public class InvalidOrderStatusException extends InvalidDataException {
    public InvalidOrderStatusException(String message) {
        super(message);
    }
}