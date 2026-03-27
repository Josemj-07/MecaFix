package com.mecafix.domain.exceptions;

public class InvalidQuoteException extends RuntimeException {
    public InvalidQuoteException(String message) {
        super(message);
    }
}
