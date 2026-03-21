package com.mecafix.shared.exceptions;

public class InvalidProductException extends RuntimeException {
    public InvalidProductException() {
        super("INVALID_PRODUCT");
    }
}
