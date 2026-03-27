package com.mecafix.application.vehicle.usecase.register;

import com.mecafix.application.customer.port.out.CustomerRepositoryPort;
import com.mecafix.application.vehicle.mapper.VehicleMapper;
import com.mecafix.application.vehicle.port.out.VehicleRepositoryPort;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.model.entity.vehicle.Vehicle;
import com.mecafix.shared.exceptions.CustomerNotFoundException;
import com.mecafix.shared.exceptions.VehicleAlreadyExistsException;

import java.util.UUID;


public class RegisterVehicleService implements RegisterVehicleUseCase {

    private final CustomerRepositoryPort customerRepository;
    private final VehicleRepositoryPort vehicleRepository;

    public RegisterVehicleService(CustomerRepositoryPort customerRepository, VehicleRepositoryPort vehicleRepository) {
        this.customerRepository = customerRepository;
        this.vehicleRepository = vehicleRepository;
    }

    @Override
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
