package com.mecafix.domain.exceptions;

public class InvalidPriceException extends InvalidDataException {
    public InvalidPriceException() {
        super("INVALID_PRICE");
    }
}
