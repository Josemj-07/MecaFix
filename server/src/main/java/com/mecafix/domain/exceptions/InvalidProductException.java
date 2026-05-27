package com.mecafix.domain.exceptions;

public class InvalidProductException extends InvalidDataException {
    public InvalidProductException() {
        super("INVALID_PRODUCT");
    }
    public InvalidProductException(String message) {super(message);}
}
