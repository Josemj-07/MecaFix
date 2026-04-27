package com.mecafix.domain.model.entity.person.authentication;

import com.mecafix.domain.model.enums.Role;
import com.mecafix.domain.exceptions.InvalidUserException;
import com.mecafix.domain.model.valueobject.Email;

import java.util.UUID;

public class User {
    private final UUID id;
    private final Email email;
    private final String passwordHash;
    private final String name;
    private final Role role;

    public static User create(Email userEmail, String passwordHash, String name, Role role) {
        return new User(userEmail, passwordHash, name, role);
    }

    public static User reBuild(UUID id,Email userEmail, String passwordHash, String name, Role role) {
        return new User(id, userEmail, passwordHash, name, role);
    }

    private User(Email userEmail, String passwordHash, String name, Role role) {
        validateNotNull(userEmail, passwordHash, name, role);

        name = name == null ? null : name.trim();
        passwordHash = passwordHash == null ? null : passwordHash.trim();

        validateNotBlank(name, passwordHash);

        this.id = UUID.randomUUID();
        this.email = userEmail;
        this.passwordHash = passwordHash;
        this.name = name;
        this.role = role;
    }

    private User(UUID id, Email userEmail, String passwordHash, String name, Role role) {
        validateNotNull(userEmail, passwordHash, name, role);

        name = name == null ? null : name.trim();
        passwordHash = passwordHash == null ? null : passwordHash.trim();

        validateNotBlank(name, passwordHash);

        this.id = id;
        this.email = userEmail;
        this.passwordHash = passwordHash;
        this.name = name;
        this.role = role;
    }

    public UUID getId() {
        return this.id;
    }

    public Email getEmail() {
        return this.email;
    }

    public String getName() {
        return this.name;
    }

    public Role getRole() {
        return this.role;
    }

    public String getPasswordHash() {
        return this.passwordHash;
    }

    private void validateNotNull(Object... fields) {
        for (Object field : fields) {
            if (field == null) throw new InvalidUserException("All fields must not be null");
        }
    }

    private void validateNotBlank(String name, String passwordHash) {
        if (name.isBlank())
            throw new InvalidUserException("Name must not be blank");
        if (passwordHash.isBlank())
            throw new InvalidUserException("Password hash must not be blank");
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof User)) return false;
        User that = (User) obj;
        return this.id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

}