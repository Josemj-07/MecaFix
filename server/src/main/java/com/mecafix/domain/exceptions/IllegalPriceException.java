package com.mecafix.domain.exceptions;

public class IllegalPriceException extends InvalidDataException {
    public IllegalPriceException() {
        super("ILLEGAL_PRICE");
    }
    public IllegalPriceException(String message) {super(message);}
}
