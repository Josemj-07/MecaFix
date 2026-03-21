package com.mecafix.domain.model.entity;

import com.mecafix.domain.model.valueobject.Email;
import com.mecafix.shared.exceptions.InvalidPersonException;

import java.time.LocalDateTime;

public abstract class Person {

    private final Long id;
    private final String firstName;
    private final String lastName;
    private final Email email;
    private final String mobilePhone;
    private final String nationalId;
    private final LocalDateTime registrationDate;

    protected Person(Long id, String firstName, String lastName, Email email, String mobilePhone, String nationalId) {

        if (id == null || id <= 0) throw new InvalidPersonException("Id must be a positive number");
        if (firstName == null || firstName.isBlank()) throw new InvalidPersonException("First name must not be empty");
        if (lastName == null || lastName.isBlank()) throw new InvalidPersonException("Last name must not be empty");
        if (email == null) throw new InvalidPersonException("Email must not be null");
        if (mobilePhone == null || mobilePhone.isBlank()) throw new InvalidPersonException("Mobile phone must not be empty");
        if (nationalId == null || nationalId.isBlank()) throw new InvalidPersonException("National id must not be empty");

        this.id = id;
        this.firstName = firstName.trim();
        this.lastName = lastName.trim();
        this.email = email;
        this.mobilePhone = mobilePhone.trim();
        this.nationalId = nationalId.trim();
        this.registrationDate = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getFullName() { return firstName + " " + lastName; }
    public Email getEmail() { return email; }
    public String getMobilePhone() { return mobilePhone; }
    public String getNationalId() { return nationalId; }
    public LocalDateTime getRegistrationDate() { return registrationDate; }

}