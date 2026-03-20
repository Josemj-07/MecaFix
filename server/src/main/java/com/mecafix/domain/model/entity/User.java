package com.mecafix.domain.model.entity;

import com.mecafix.domain.model.enums.Role;
import com.mecafix.shared.exceptions.InvalidUserException;
import com.mecafix.domain.model.valueobject.Email;

public class User {
    private Long idUser;
    private Email userEmail;
    private String passwordHash;
    private String name;
    private Role userRole;

    public User(Long idUser, Email userEmail, String passwordHash, String name, Role role ) {
        if(idUser == null ||idUser < 0 || passwordHash  == null || name == null || role == null) {
            throw new InvalidUserException();
        }
        this.idUser = idUser;
        this.userEmail = userEmail;
        this.passwordHash = passwordHash;
        this.name = name;
        this.userRole = role;
    }

    public Long getIdUser() {
        return this.idUser;
    }
    public String getEmail() {
        return userEmail.address();
    }
    public String getName() {
        return this.name;
    }
    public Role getUserRole() {
        return this.userRole;
    }
    public String getPasswordHash() {return this.passwordHash;}

}
