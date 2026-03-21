package com.mecafix.domain.model.entity;

import com.mecafix.shared.exceptions.InvalidVehicleException;

import java.time.Year;

public class Vehicle {

    private final Long id;
    private final String plate;
    private final String brand;
    private final String model;
    private final int manufacturingYear;
    private int mileage;
    private final String color;

    public Vehicle(Long id, String plate, String brand, String model, int manufacturingYear, int mileage, String color) {

        if (id == null || id <= 0) throw new InvalidVehicleException("Id must be a positive number");
        if (plate == null || plate.isBlank()) throw new InvalidVehicleException("Plate must not be empty");
        if (brand == null || brand.isBlank()) throw new InvalidVehicleException("Brand must not be empty");
        if (model == null || model.isBlank()) throw new InvalidVehicleException("Model must not be empty");
        if (manufacturingYear < 1886 || manufacturingYear > Year.now().getValue()) throw new InvalidVehicleException("Manufacturing year is not valid");
        if (mileage < 0) throw new InvalidVehicleException("Mileage must not be negative");
        if (color == null || color.isBlank()) throw new InvalidVehicleException("Color must not be empty");

        this.id = id;
        this.plate = plate.trim().toUpperCase();
        this.brand = brand.trim();
        this.model = model.trim();
        this.manufacturingYear = manufacturingYear;
        this.mileage = mileage;
        this.color = color.trim();
    }

    public Long getId() { return id; }
    public String getPlate() { return plate; }
    public String getBrand() { return brand; }
    public String getModel() { return model; }
    public int getManufacturingYear() { return manufacturingYear; }
    public int getMileage() { return mileage; }
    public String getColor() { return color; }

    public void setMileage(int mileage) {
        if (mileage < this.mileage) throw new InvalidVehicleException("New mileage cannot be less than current mileage");
        if (mileage < 0) throw new InvalidVehicleException("Mileage must not be negative");
        this.mileage = mileage;
    }

}


