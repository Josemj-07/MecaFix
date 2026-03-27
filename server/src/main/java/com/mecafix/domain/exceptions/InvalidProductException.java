package com.mecafix.domain.exceptions;

public class InvalidProductException extends RuntimeException {
    public InvalidProductException() {
        super("INVALID_PRODUCT");
    }
    public InvalidProductException(String message) {super(message);}
}
