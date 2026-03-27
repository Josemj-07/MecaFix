package com.mecafix.domain.exceptions;

public class InvalidProductDetailException extends RuntimeException {
    public InvalidProductDetailException(String message) {
        super(message);
    }
}
