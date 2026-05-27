package com.mecafix.adapter.out.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name="service")
@NoArgsConstructor
@Getter
@AllArgsConstructor
public class ServiceJpaEntity {
    @Id
    private UUID id;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="description", nullable = false)
    private String description;

    @Column(name="laborprice", nullable = false)
    private BigDecimal laborPrice;
}
