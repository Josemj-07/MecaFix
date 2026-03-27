package com.mecafix.domain.exceptions;

public class IllegalSaleException extends RuntimeException {
    public IllegalSaleException() {
        super("ILEGAL_SALE");
    }
}
