package com.mecafix.shared.exceptions;

public class InvalidQuoteException extends RuntimeException {
    public InvalidQuoteException(String message) {
        super(message);
    }
}
