package com.mecafix.domain.model.entity;

import com.mecafix.domain.model.valueobject.Email;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Customer extends Person {

    private final List<Vehicle> vehicles;

    public Customer(Long id, String firstName, String lastName, Email email, String mobilePhone, String nationalId) {
        super(id, firstName, lastName, email, mobilePhone, nationalId);
        this.vehicles = new ArrayList<>();
    }

    public void addVehicle(Vehicle vehicle) {
        if (vehicle == null) throw new IllegalArgumentException("Vehicle must not be null");
        if (vehicles.contains(vehicle)) throw new IllegalArgumentException("Vehicle is already registered to this customer");
        vehicles.add(vehicle);
    }

    public void removeVehicle(Vehicle vehicle) {
        if (vehicle == null) throw new IllegalArgumentException("Vehicle must not be null");
        if (!vehicles.contains(vehicle)) throw new IllegalArgumentException("Vehicle does not belong to this customer");
        vehicles.remove(vehicle);
    }

    public List<Vehicle> getVehicles() {
        return Collections.unmodifiableList(vehicles);
    }

}
