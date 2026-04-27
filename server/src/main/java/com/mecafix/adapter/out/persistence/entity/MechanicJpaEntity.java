package com.mecafix.adapter.out.persistence.entity;

import com.mecafix.domain.model.enums.Specialty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name="mechanic")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MechanicJpaEntity {
    @Id
    private UUID id;

    @Column(name= "firstname", nullable = false)
    private String firstName;

    @Column(name= "lastname", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "mobilephone", nullable = false, unique = true)
    private String mobilePhone;

    @Column(unique = true, nullable = false)
    private String dni;

    @Column(name="speciality", nullable = false)
    @Enumerated(EnumType.STRING)
    private Specialty specialty;
}
