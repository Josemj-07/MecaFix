package com.mecafix.application.exceptions;

import com.mecafix.domain.exceptions.NotFoundException;

public class TaskNotFoundException extends NotFoundException {
    public TaskNotFoundException(String message) {
        super(message);
    }
}
