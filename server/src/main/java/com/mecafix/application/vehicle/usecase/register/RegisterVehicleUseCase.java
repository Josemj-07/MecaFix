package com.mecafix.application.vehicle.usecase.register;

import com.mecafix.application.vehicle.mapper.VehicleMapper;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.model.entity.vehicle.Vehicle;
import com.mecafix.application.exceptions.CustomerNotFoundException;
import com.mecafix.application.exceptions.VehicleAlreadyExistsException;
import com.mecafix.domain.port.customer.CustomerRepositoryPort;
import com.mecafix.domain.port.vehicle.VehicleRepositoryPort;

import java.util.UUID;


public class RegisterVehicleUseCase {

    private final CustomerRepositoryPort customerRepository;
    private final VehicleRepositoryPort vehicleRepository;

    public RegisterVehicleUseCase(CustomerRepositoryPort customerRepository, VehicleRepositoryPort vehicleRepository) {
        this.customerRepository = customerRepository;
        this.vehicleRepository = vehicleRepository;
    }

    public RegisterVehicleResult execute(RegisterVehicleCommand command) {

        if (vehicleRepository.existsByPlate(command.plate())) {
            throw new VehicleAlreadyExistsException("A vehicle with plate " + command.plate() + " already exists");
        }

        Customer customer = customerRepository.findById(UUID.fromString(command.customerId()))
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found with id " + command.customerId()));

        Vehicle vehicle = Vehicle.create(
                command.plate(),
                command.brand(),
                command.model(),
                command.manufacturingYear(),
                command.mileage(),
                command.color()
        );

        customer.addVehicle(vehicle);

        vehicleRepository.save(vehicle);
        customerRepository.save(customer);

        return VehicleMapper.toResult(vehicle);
    }

}
