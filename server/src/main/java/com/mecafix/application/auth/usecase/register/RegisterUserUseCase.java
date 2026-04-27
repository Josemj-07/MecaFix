package com.mecafix.application.auth.usecase.register;

import com.mecafix.domain.exceptions.ConflictException;
import com.mecafix.domain.exceptions.InvalidDataException;
import com.mecafix.domain.model.entity.person.authentication.User;
import com.mecafix.domain.model.enums.Role;
import com.mecafix.domain.model.valueobject.Email;
import com.mecafix.domain.port.user.UserRepositoryPort;
import com.mecafix.domain.port.util.PasswordHasher;

public class RegisterUserUseCase {

    private final UserRepositoryPort userRepository;
    private final PasswordHasher passwordHasher;

    public RegisterUserUseCase(UserRepositoryPort userRepository,
                               PasswordHasher passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }

    /**
     * Registers a new user. Only an OWNER can invoke this use case.
     * The caller's role is validated at the security layer (SecurityConfig / AuthController).
     *
     * @param command the registration data
     * @param callerRole the role of the authenticated user performing the registration
     * @return the result with the new user's data
     */
    public RegisterUserResult execute(RegisterUserCommand command, Role callerRole) {
        // 1. Verify that the user attempting to register has the OWNER role
        if (callerRole != Role.OWNER) {
            throw new InvalidDataException("Only users with OWNER role can register new users");
        }

        // 2. Verify email is not already in use
        if (userRepository.existsByEmail(command.email())) {
            throw new ConflictException("A user with email '" + command.email() + "' already exists");
        }

        // 3. Parse the target role
        Role targetRole;
        try {
            targetRole = Role.valueOf(command.role());
        } catch (IllegalArgumentException e) {
            throw new InvalidDataException("Invalid role: " + command.role());
        }

        // 4. Encrypt the password using the existing password hasher port
        String hashedPassword = passwordHasher.hash(command.password());

        // 5. Create the new user domain entity
        User newUser = User.create(new Email(command.email()), hashedPassword, command.name(), targetRole);

        // 6. Persist the user using the repository port
        userRepository.save(newUser);

        return new RegisterUserResult(
                newUser.getId(),
                newUser.getEmail().address(),
                newUser.getName(),
                newUser.getRole().name()
        );
    }
}
