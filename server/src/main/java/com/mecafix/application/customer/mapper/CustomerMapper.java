package com.mecafix.application.customer.mapper;

import com.mecafix.application.customer.usecase.createcustomer.CreateCustomerResult;
import com.mecafix.application.customer.usecase.getcustomer.GetCustomerResult;
import com.mecafix.application.customer.usecase.getcustomervehicles.GetCustomerVehiclesResult;
import com.mecafix.application.customer.usecase.getcustomervehicles.VehicleResult;
import com.mecafix.application.customer.usecase.listcustomers.ListCustomersResult;
import com.mecafix.application.customer.usecase.updatecustomer.UpdateCustomerResult;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.model.entity.vehicle.Vehicle;

import java.util.List;

public class CustomerMapper {

    private CustomerMapper() { }

    public static CreateCustomerResult toCreateResult(Customer customer) {
        return new CreateCustomerResult(
                customer.getId(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getEmail().address(),
                customer.getMobilePhone().mobilePhone(),
                customer.getDni().dni()
        );
    }

    public static GetCustomerResult toGetResult(Customer customer) {
        return new GetCustomerResult(
                customer.getId(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getEmail().address(),
                customer.getMobilePhone().mobilePhone(),
                customer.getDni().dni()
        );
    }

    public static ListCustomersResult toListResult(List<Customer> customers) {
        List<ListCustomersResult.CustomerResult> results = customers.stream()
                .map(CustomerMapper::toCustomerResult)
                .toList();
        return new ListCustomersResult(results);
    }

    public static UpdateCustomerResult toUpdateResult(Customer customer) {
        return new UpdateCustomerResult(
                customer.getId(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getEmail().address(),
                customer.getMobilePhone().mobilePhone(),
                customer.getDni().dni()
        );
    }

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

    private static ListCustomersResult.CustomerResult toCustomerResult(Customer customer) {
        return new ListCustomersResult.CustomerResult(
                customer.getId(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getEmail().address(),
                customer.getDni().dni()
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
