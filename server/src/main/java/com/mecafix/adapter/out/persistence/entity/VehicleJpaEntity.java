package com.mecafix.adapter.out.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Entity
@Table(name="vehicle")
@NoArgsConstructor
@Getter
@AllArgsConstructor
public class VehicleJpaEntity {
    @Id
    private UUID id;

    @Column(name="plate", unique = true, nullable = false)
    private String plate;

    @Column(name="brand", nullable = false)
    private String brand;

    @Column(name="model", nullable = false)
    private String model;

    @Column(name="manufacturingyear", nullable = false)
    private long manufacturingYear;

    @Column(name = "mileage", nullable = false)
    private long mileage;

    @Column(name = "color", nullable = false)
    private String color;

    @ManyToOne
    @JoinColumn(name = "id_customer")
    private CustomerJpaEntity customer;


}
