package com.mecafix.domain.model.entity.person;

import com.mecafix.domain.exceptions.InvalidCustomerException;
import com.mecafix.domain.model.entity.vehicle.Vehicle;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

public class Customer extends Person {
    private final List<Vehicle> vehicles;

    public static Customer create(String firstName, String lastName, String email, String mobilePhone,
            String nationalId, List<Vehicle> vehicles) {
        return new Customer(
                firstName, lastName, email,
                mobilePhone, nationalId, vehicles);
    }

    public static Customer reBuild(UUID id, String firstName, String lastName, String email, String mobilePhone,
            String nationalId, List<Vehicle> vehicles) {
        return new Customer(id,
                firstName, lastName, email,
                mobilePhone, nationalId, vehicles);
    }

    private Customer(String firstName, String lastName, String email, String mobilePhone, String nationalId,
            List<Vehicle> vehicles) {
        super(firstName, lastName, email, mobilePhone, nationalId);
        this.vehicles = vehicles != null ? new ArrayList<>(vehicles) : new ArrayList<>();
    }

    private Customer(UUID id, String firstName, String lastName, String email, String mobilePhone, String nationalId,
            List<Vehicle> vehicles) {
        super(id, firstName, lastName, email, mobilePhone, nationalId);
        this.vehicles = vehicles != null ? new ArrayList<>(vehicles) : new ArrayList<>();
    }

    public void addVehicle(Vehicle vehicle) {
        if (vehicle == null)
            throw new InvalidCustomerException("Vehicle must not be null");
        if (vehicles.contains(vehicle))
            throw new InvalidCustomerException("Vehicle is already registered to this customer");
        vehicles.add(vehicle);
    }

    public void removeVehicle(Vehicle vehicle) {
        if (vehicle == null)
            throw new InvalidCustomerException("Vehicle must not be null");
        if (!vehicles.contains(vehicle))
            throw new InvalidCustomerException("Vehicle does not belong to this customer");
        vehicles.remove(vehicle);
    }

    public List<Vehicle> getVehicles() {
        return Collections.unmodifiableList(vehicles);
    }

}
