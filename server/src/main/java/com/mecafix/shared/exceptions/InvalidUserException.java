package com.mecafix.shared.exceptions;

public class InvalidUserException extends RuntimeException {

    public InvalidUserException() {
        super("INVALID_USER");
    }
    public InvalidUserException(String message){
        super(message);
    }
    public InvalidUserException(String message, Throwable throwable) {
        super(message, throwable);
    }
    public InvalidUserException(Throwable throwable) {
        super(throwable);
    }

}
