package com.mecafix.domain.model.entity.person;

import com.mecafix.domain.exceptions.InvalidCustomerException;
import com.mecafix.domain.model.entity.vehicle.Vehicle;
import com.mecafix.domain.model.valueobject.Email;
import com.mecafix.domain.model.valueobject.MobilePhone;
import com.mecafix.domain.model.valueobject.Dni;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Customer extends Person {
    private final List<Vehicle> vehicles;

    public static Customer create(String firstName, String lastName, Email email, MobilePhone mobilePhone, Dni nationalId) {
        return new Customer(
                firstName, lastName, email,
                mobilePhone, nationalId
        );
    }

    public static Customer reBuild(String id, String firstName, String lastName, Email email, MobilePhone mobilePhone, Dni nationalId) {
        return new Customer( id,
                firstName, lastName, email,
                mobilePhone, nationalId
        );
    }

    private Customer(String firstName, String lastName, Email email, MobilePhone mobilePhone, Dni nationalId) {
        super(firstName, lastName, email, mobilePhone, nationalId);
        this.vehicles = new ArrayList<>();
    }

    private Customer(String id, String firstName, String lastName, Email email, MobilePhone mobilePhone, Dni nationalId) {
        super(id, firstName, lastName, email, mobilePhone, nationalId);
        this.vehicles = new ArrayList<>();
    }


    public void addVehicle(Vehicle vehicle) {
        if (vehicle == null) throw new InvalidCustomerException("Vehicle must not be null");
        if (vehicles.contains(vehicle)) throw new InvalidCustomerException("Vehicle is already registered to this customer");
        vehicles.add(vehicle);
    }

    public void removeVehicle(Vehicle vehicle) {
        if (vehicle == null) throw new InvalidCustomerException("Vehicle must not be null");
        if (!vehicles.contains(vehicle)) throw new InvalidCustomerException("Vehicle does not belong to this customer");
        vehicles.remove(vehicle);
    }

    public List<Vehicle> getVehicles() {
        return Collections.unmodifiableList(vehicles);
    }

}
