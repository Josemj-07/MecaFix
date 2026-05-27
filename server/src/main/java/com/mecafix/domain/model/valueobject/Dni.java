package com.mecafix.domain.model.valueobject;

import com.mecafix.domain.exceptions.InvalidNationalIdException;

import java.util.regex.Pattern;

public record Dni(String dni) {
    private static final Pattern DNI_PATTERN = Pattern.compile("^[0-9]{8,10}$");

    public Dni {
        if (dni == null || dni.isBlank())
            throw new InvalidNationalIdException("dni must not be empty");

        String trimmed = dni.trim();
        if (!DNI_PATTERN.matcher(trimmed).matches())
            throw new InvalidNationalIdException("dni is not valid");

        dni = trimmed;
    }
}
