
package com.mecafix.domain.model.entity.service;


import com.mecafix.domain.exceptions.InvalidServiceException;

import java.math.BigDecimal;
import java.util.UUID;

public class Service {
    private final UUID id;
    private final String name;
    private String description;
    private final BigDecimal laborPrice;

    public static Service create(String name, String description, BigDecimal laborPrice) {
        return new Service(name, description, laborPrice);
    }

    public static Service reBuild(UUID id, String name, String description, BigDecimal laborPrice) {
        return new Service(id, name, description, laborPrice);
    }

    private Service(String name, String description, BigDecimal laborPrice) {
        name = name == null ? null : name.trim();
        if (name == null || name.isBlank()) throw new InvalidServiceException("Name must not be empty");

        description = description == null ? null : description.trim();
        if (description == null || description.isBlank())
            throw new InvalidServiceException("Description must not be empty");

        if (laborPrice == null || laborPrice.compareTo(BigDecimal.ZERO) < 0)
            throw new InvalidServiceException("Labor price must not be negative");

        this.id = UUID.randomUUID();
        this.name = name;
        this.description = description;
        this.laborPrice = laborPrice;
    }


    private Service(UUID id, String name, String description, BigDecimal laborPrice) {
        name = name == null ? null : name.trim();
        if (name == null || name.isBlank()) throw new InvalidServiceException("Name must not be empty");

        description = description == null ? null : description.trim();
        if (description == null || description.isBlank())
            throw new InvalidServiceException("Description must not be empty");

        if (laborPrice == null || laborPrice.compareTo(BigDecimal.ZERO) < 0)
            throw new InvalidServiceException("Labor price must not be negative");

        if(id == null)
            throw new InvalidServiceException("id must not be null");

        this.id = id;
        this.name = name;
        this.description = description;
        this.laborPrice = laborPrice;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getLaborPrice() {
        return laborPrice;
    }

    public void changeDescription(String newDescription) {
        newDescription = newDescription == null ? null : newDescription.trim();
        if(newDescription == null || newDescription.isBlank()) throw new InvalidServiceException("description must not be empty");
        this.description = newDescription;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Service)) return false;
        Service that = (Service) o;
        return this.id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

}