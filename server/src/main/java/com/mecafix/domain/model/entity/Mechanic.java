package com.mecafix.domain.model.entity;

import com.mecafix.domain.model.enums.Specialty;
import com.mecafix.domain.model.valueobject.Email;
import com.mecafix.shared.exceptions.InvalidMechanicException;

public class Mechanic extends Person {

    private final Specialty specialty;

    public Mechanic(Long id, String firstName, String lastName, Email email, String mobilePhone, String nationalId, Specialty specialty) {
        super(id, firstName, lastName, email, mobilePhone, nationalId);

        if (specialty == null) throw new InvalidMechanicException("Specialty must not be null");

        this.specialty = specialty;
    }

    public Specialty getSpecialty() { return specialty; }

}