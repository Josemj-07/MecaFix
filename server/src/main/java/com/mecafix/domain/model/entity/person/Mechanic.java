package com.mecafix.domain.model.entity.person;

import com.mecafix.domain.model.enums.Specialty;
import com.mecafix.domain.exceptions.InvalidMechanicException;

import java.util.UUID;

public class Mechanic extends Person {
    private final Specialty specialty;

    public static Mechanic create(String firstName, String lastName, String email, String mobilePhone,
            String nationalId, Specialty specialty) {
        return new Mechanic(
                firstName, lastName, email, mobilePhone,
                nationalId, specialty);
    }

    public static Mechanic reBuild(UUID id, String firstName, String lastName, String email, String mobilePhone,
            String nationalId, Specialty specialty) {
        return new Mechanic(id,
                firstName, lastName, email, mobilePhone,
                nationalId, specialty);
    }

    private Mechanic(String firstName, String lastName, String email, String mobilePhone, String nationalId,
            Specialty specialty) {
        super(firstName, lastName, email, mobilePhone, nationalId);
        if (specialty == null)
            throw new InvalidMechanicException("speciality must not be null");
        this.specialty = specialty;
    }

    private Mechanic(UUID id, String firstName, String lastName, String email, String mobilePhone, String nationalId,
            Specialty specialty) {
        super(id, firstName, lastName, email, mobilePhone, nationalId);
        if (specialty == null)
            throw new InvalidMechanicException("speciality must not be null");
        this.specialty = specialty;
    }

    public Specialty getSpecialty() {
        return this.specialty;
    }

}