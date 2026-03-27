package com.mecafix.domain.exceptions;

public class InvalidPriceException extends RuntimeException {
    public InvalidPriceException() {
        super("INVALID_PRICE");
    }
}
