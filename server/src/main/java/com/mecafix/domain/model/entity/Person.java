package com.mecafix.domain.model.entity;

import com.mecafix.domain.model.valueobject.Email;
import com.mecafix.shared.exceptions.InvalidPersonException;

import java.time.LocalDateTime;
import java.util.regex.Pattern;

public abstract class Person {

    private static final Pattern MOBILE_PHONE_PATTERN = Pattern.compile("^\\d+$");

    private final Long id;
    private final String firstName;
    private final String lastName;
    private Email email;
    private String mobilePhone;
    private final String nationalId;
    private final LocalDateTime registrationDate;

    protected Person(Long id, String firstName, String lastName, Email email, String mobilePhone, String nationalId) {

        if (id == null || id <= 0) throw new InvalidPersonException("Id must be a positive number");
        if (firstName == null || firstName.isBlank()) throw new InvalidPersonException("First name must not be empty");
        if (lastName == null || lastName.isBlank()) throw new InvalidPersonException("Last name must not be empty");
        if (email == null) throw new InvalidPersonException("Email must not be null");
        if (nationalId == null || nationalId.isBlank()) throw new InvalidPersonException("National id must not be empty");

        this.id = id;
        this.firstName = firstName.trim();
        this.lastName = lastName.trim();
        this.email = email;
        this.mobilePhone = normalizeAndValidateMobilePhone(mobilePhone);
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

    public void updateEmail(Email newEmail) {
        if(newEmail == null) {
            throw new IllegalArgumentException("Email should not be null");
        }
        this.email = newEmail;
    }

    public void updateMobilePhone(String newMobilePhone) {
        this.mobilePhone = normalizeAndValidateMobilePhone(newMobilePhone);
    }

    private static String normalizeAndValidateMobilePhone(String mobilePhone) {
        if (mobilePhone == null) {
            throw new InvalidPersonException("Mobile phone must not be null");
        }

        mobilePhone = mobilePhone.trim();

        if (mobilePhone.isBlank() || !MOBILE_PHONE_PATTERN.matcher(mobilePhone).matches()) {
            throw new InvalidPersonException("Invalid mobile phone");
        }

        return mobilePhone;
    }

}