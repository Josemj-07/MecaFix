package com.mecafix.domain.exceptions;

public class InvalidSaleDetailException extends RuntimeException {
    public InvalidSaleDetailException() {
        super("INVALID_SALE_DETAIL");
    }
}