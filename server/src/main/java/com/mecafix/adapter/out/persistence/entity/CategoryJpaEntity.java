package com.mecafix.adapter.out.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name="category")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryJpaEntity {
    @Id
    private UUID id;

    @Column(name="name", nullable = false)
    private String name;
}
