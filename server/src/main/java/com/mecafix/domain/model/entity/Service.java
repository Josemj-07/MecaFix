
package com.mecafix.domain.model.entity;


import com.mecafix.shared.exceptions.InvalidServiceException;
 
import java.math.BigDecimal;
 
public class Service {
 
    private final Long id;
    private final String name;
    private final String description;
    private final BigDecimal laborPrice;
 
    public Service(Long id, String name, String description, BigDecimal laborPrice) {
 
        if (id == null || id <= 0) throw new InvalidServiceException("Id must be a positive number");
        if (name == null || name.isBlank()) throw new InvalidServiceException("Name must not be empty");
        if (description == null || description.isBlank()) throw new InvalidServiceException("Description must not be empty");
        if (laborPrice == null || laborPrice.compareTo(BigDecimal.ZERO) < 0) throw new InvalidServiceException("Labor price must not be negative");
 
        this.id = id;
        this.name = name.trim();
        this.description = description.trim();
        this.laborPrice = laborPrice;
    }
 
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public BigDecimal getLaborPrice() { return laborPrice; }
 
}