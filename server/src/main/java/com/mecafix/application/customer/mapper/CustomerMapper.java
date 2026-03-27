package com.mecafix.application.customer.mapper;

import com.mecafix.application.customer.usecase.getcustomervehicles.GetCustomerVehiclesResult;
import com.mecafix.application.customer.usecase.getcustomervehicles.VehicleResult;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.model.entity.vehicle.Vehicle;

import java.util.List;

public class CustomerMapper {

    private CustomerMapper() { }

    public static GetCustomerVehiclesResult toGetVehiclesResult(Customer customer) {
        List<VehicleResult> vehicleResults = customer.getVehicles()
                .stream()
                .map(CustomerMapper::toVehicleResult)
                .toList();

        return new GetCustomerVehiclesResult(
                customer.getId(),
                customer.getFullName(),
                vehicleResults
        );
    }

    private static VehicleResult toVehicleResult(Vehicle vehicle) {
        return new VehicleResult(
                vehicle.getId(),
                vehicle.getPlate(),
                vehicle.getBrand(),
                vehicle.getModel(),
                vehicle.getManufacturingYear(),
                vehicle.getMileage(),
                vehicle.getColor()
        );
    }

}
