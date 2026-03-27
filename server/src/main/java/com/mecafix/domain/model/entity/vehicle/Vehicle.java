package com.mecafix.domain.model.entity.vehicle;

import com.mecafix.domain.exceptions.InvalidVehicleException;

import java.time.Year;
import java.util.UUID;

public class Vehicle {
    private static final short EARLIEST_MANUFACTURING_YEAR = 1886;

    private final UUID id;
    private final String plate;
    private final String brand;
    private final String model;
    private final int manufacturingYear;
    private Long mileage;
    private String color;

    public static Vehicle create(String plate, String brand, String model, int manufacturingYear, Long mileage, String color) {
        return new Vehicle(plate, brand, model, manufacturingYear, mileage, color);
    }

    private Vehicle(String plate, String brand, String model, int manufacturingYear, Long mileage, String color) {

        if (plate == null || plate.isBlank()) throw new InvalidVehicleException("Plate must not be empty");
        if (brand == null || brand.isBlank()) throw new InvalidVehicleException("Brand must not be empty");
        if (model == null || model.isBlank()) throw new InvalidVehicleException("Model must not be empty");
        if (manufacturingYear < EARLIEST_MANUFACTURING_YEAR|| manufacturingYear > Year.now().getValue()) throw new InvalidVehicleException("Manufacturing year is not valid");
        if (mileage < 0) throw new InvalidVehicleException("Mileage must not be negative");
        if (color == null || color.isBlank()) throw new InvalidVehicleException("Color must not be empty");

        this.id = UUID.randomUUID();
        this.plate = plate.trim().toUpperCase();
        this.brand = brand.trim();
        this.model = model.trim();
        this.manufacturingYear = manufacturingYear;
        this.mileage = mileage;
        this.color = color.trim();
    }

    public UUID getId() { return id; }

    public String getPlate() { return plate; }

    public String getBrand() { return brand; }

    public String getModel() { return model; }

    public int getManufacturingYear() { return manufacturingYear; }

    public Long getMileage() { return mileage; }

    public String getColor() { return color; }

    public void changeMileage(Long mileage) {
        if(mileage == null) throw new InvalidVehicleException("Mileage must not be null");
        if(mileage < 0 || mileage < this.mileage) throw new InvalidVehicleException("Invalid value of mileage");
        if(mileage.equals(this.mileage)) return;

        this.mileage = mileage;
    }

    public void setColor(String color) {
        color = color == null ? null : color.trim();
        if(color == null || color.isBlank()) throw new InvalidVehicleException("Color must not be empty");
        this.color = color;
    }

    @Override
    public boolean equals(Object obj) {
        if(this == obj) return true;
        if(!(obj instanceof Vehicle)) return false;

        Vehicle that = (Vehicle) obj;
        return this.id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return this.id.hashCode();
    }

}


