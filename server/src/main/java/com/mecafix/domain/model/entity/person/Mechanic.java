package com.mecafix.domain.model.entity.person;

import com.mecafix.domain.model.enums.Specialty;
import com.mecafix.domain.model.valueobject.Email;
import com.mecafix.domain.exceptions.InvalidMechanicException;
import com.mecafix.domain.model.valueobject.MobilePhone;
import com.mecafix.domain.model.valueobject.Dni;


public class Mechanic extends Person{
    private final Specialty specialty;

    public static Mechanic create(String firstName, String lastName, Email email, MobilePhone mobilePhone, Dni nationalId, Specialty specialty){
        return new Mechanic(
                firstName, lastName, email, mobilePhone,
                nationalId, specialty
        );
    }

    private Mechanic(String firstName, String lastName, Email email, MobilePhone mobilePhone, Dni nationalId, Specialty specialty){
        super(firstName, lastName, email, mobilePhone, nationalId);
        if(specialty == null) throw new InvalidMechanicException("speciality must not be null");
        this.specialty = specialty;
    }

    public Specialty getSpecialty() {return this.specialty;}

}