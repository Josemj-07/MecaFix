package com.mecafix.shared.exceptions;

public class InvalidEmailException extends RuntimeException {

    public InvalidEmailException() {
        super("INVALID_EMAIL");
    }
    public InvalidEmailException(String message) {
        super(message);
    }
    public InvalidEmailException(Throwable throwable) {
        super(throwable);
    }
    public InvalidEmailException(String message, Throwable throwable) {
        super(message, throwable);
    }

}
