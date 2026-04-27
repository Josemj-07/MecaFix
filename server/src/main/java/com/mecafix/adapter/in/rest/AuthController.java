package com.mecafix.adapter.in.rest;

import com.mecafix.application.auth.usecase.login.LoginCommand;
import com.mecafix.application.auth.usecase.login.LoginResult;
import com.mecafix.application.auth.usecase.login.LoginUseCase;
import com.mecafix.application.auth.usecase.register.RegisterUserCommand;
import com.mecafix.application.auth.usecase.register.RegisterUserResult;
import com.mecafix.application.auth.usecase.register.RegisterUserUseCase;
import com.mecafix.domain.model.enums.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final LoginUseCase loginUseCase;
    private final RegisterUserUseCase registerUserUseCase;

    /**
     * POST /auth/login — Public endpoint.
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResult> login(@RequestBody LoginCommand command) {
        log.info("REST | POST /auth/login | email={}", command.email());
        LoginResult result = loginUseCase.execute(command);
        return ResponseEntity.ok(result);
    }

    /**
     * POST /auth/register — Only accessible by OWNER role.
     */
    @PostMapping("/register")
    public ResponseEntity<RegisterUserResult> register(
            @RequestBody RegisterUserCommand command,
            Authentication authentication) {
        log.info("REST | POST /auth/register | email={}", command.email());

        // Extract the caller's role from the authentication context
        Role callerRole = extractRole(authentication);

        RegisterUserResult result = registerUserUseCase.execute(command, callerRole);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    private Role extractRole(Authentication authentication) {
        String authority = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .filter(a -> a.startsWith("ROLE_"))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("No role found in authentication"));

        // Remove "ROLE_" prefix to get the enum name
        String roleName = authority.substring(5);
        return Role.valueOf(roleName);
    }
}
