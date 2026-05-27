package com.mecafix.domain.port.util;

public interface PasswordHasher {

    /*
     * Defines a contract for password hashing implementations.
     * This allows different adapters (e.g., BCrypt, Argon2) to be used interchangeably.
     * The port defines what must be done, while the adapter defines how it is done.
     */

    String hash(String password);
    boolean matches(String rawPassword, String passwordHashed);
}
