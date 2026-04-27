package com.mecafix.adapter.out.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="customer")
@NoArgsConstructor
@Getter
@AllArgsConstructor
public class CustomerJpaEntity {
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

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    List<VehicleJpaEntity> vehicles = new ArrayList<>();
}