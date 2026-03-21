package com.mecafix.shared.exceptions;

public class IllegalPriceException extends RuntimeException {
    public IllegalPriceException() {
        super("ILLEGAL_PRICE");
    }
}
