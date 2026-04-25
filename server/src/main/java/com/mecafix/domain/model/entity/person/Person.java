package com.mecafix.domain.model.entity.person;

import com.mecafix.domain.model.valueobject.Email;
import com.mecafix.domain.model.valueobject.MobilePhone;
import com.mecafix.domain.exceptions.InvalidPersonException;
import com.mecafix.domain.model.valueobject.Dni;

import java.time.LocalDateTime;
import java.util.UUID;

public abstract class Person {
    private final UUID id;
    private final String firstName;
    private final String lastName;
    private Email email;
    private MobilePhone mobilePhone;
    private Dni dni;
    private final LocalDateTime registrationDate;

    /**
     * Protected constructor for subclasses. Enforces mandatory person attributes.
     * Subclasses should provide factory methods (create()) for instantiation.
     */

    protected Person(String firstName, String lastName, Email email, MobilePhone mobilePhone, Dni nationalId) {
        firstName = firstName == null ? null : firstName.trim();
        if (firstName == null || firstName.isBlank()) throw new InvalidPersonException("First name must not be empty");
        lastName = lastName == null ? null : lastName.trim();
        if (lastName == null || lastName.isBlank()) throw new InvalidPersonException("Last name must not be empty");
        if (email == null) throw new InvalidPersonException("Email must not be null");
        if (mobilePhone == null) throw new InvalidPersonException("Mobile phone must not be null");
        if (nationalId == null) throw new InvalidPersonException("National id must not be empty");

        this.id = UUID.randomUUID();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobilePhone = mobilePhone;
        this.dni = nationalId;
        this.registrationDate = LocalDateTime.now();
    }

    protected Person(String id, String firstName, String lastName, Email email, MobilePhone mobilePhone, Dni nationalId) {
        firstName = firstName == null ? null : firstName.trim();
        if (firstName == null || firstName.isBlank()) throw new InvalidPersonException("First name must not be empty");
        lastName = lastName == null ? null : lastName.trim();
        if (lastName == null || lastName.isBlank()) throw new InvalidPersonException("Last name must not be empty");
        if (email == null) throw new InvalidPersonException("Email must not be null");
        if(id == null) throw new InvalidPersonException("id must not be null");
        if (mobilePhone == null) throw new InvalidPersonException("Mobile phone must not be null");
        if (nationalId == null) throw new InvalidPersonException("National id must not be empty");

        this.id = UUID.fromString(id);
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobilePhone = mobilePhone;
        this.dni = nationalId;
        this.registrationDate = LocalDateTime.now();
    }

    public UUID getId() { return this.id; }

    public String getFirstName() { return firstName; }

    public String getLastName() { return lastName; }

    public String getFullName() { return firstName + " " + lastName; }

    public Email getEmail() { return email; }

    public MobilePhone getMobilePhone() { return mobilePhone; }

    public Dni getDni() { return dni; }

    public LocalDateTime getRegistrationDate() { return registrationDate; }

    public void changeEmail(Email email) {
        if(email == null) throw new InvalidPersonException("Email must not be null");
        if(this.email.equals(email)) return;
        this.email = email;
    }

    public void changeMobilePhone(MobilePhone mobilePhone) {
        if(mobilePhone == null) throw new InvalidPersonException("Mobile phone must not be null");
        if(this.mobilePhone.equals(mobilePhone)) return;
        this.mobilePhone = mobilePhone;
    }

    public void setDni(Dni dni) {
        if(dni == null) throw new InvalidPersonException("National id must not be null");
        if(this.dni.equals(dni)) return;
        this.dni = dni;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Person)) return false;
        Person that = (Person) o;
        return this.id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}