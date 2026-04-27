package com.mecafix.adapter.out.persistence.gateway;

import com.mecafix.adapter.out.persistence.entity.ServiceOrderJpaEntity;
import com.mecafix.adapter.out.persistence.mapper.PaymentMapper;
import com.mecafix.adapter.out.persistence.mapper.QuoteMapper;
import com.mecafix.adapter.out.persistence.mapper.ServiceOrderMapper;
import com.mecafix.adapter.out.persistence.mapper.VehicleMapper;
import com.mecafix.adapter.out.persistence.mapper.CustomerMapper;
import com.mecafix.adapter.out.persistence.mapper.PayablesMapper;
import com.mecafix.adapter.out.persistence.repository.PaymentJpaRepository;
import com.mecafix.adapter.out.persistence.repository.ServiceOrderJpaRepository;
import com.mecafix.domain.model.contract.IPayable;
import com.mecafix.domain.model.entity.order.ServiceOrder;
import com.mecafix.domain.model.entity.payment.Payment;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.model.entity.quote.Quote;
import com.mecafix.domain.model.entity.vehicle.Vehicle;
import com.mecafix.domain.port.payment.PaymentRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import com.mecafix.domain.model.entity.order.Task;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class PaymentRepositoryGateway implements PaymentRepositoryPort {

    private final PaymentJpaRepository paymentJpaRepository;
    private final ServiceOrderJpaRepository serviceOrderJpaRepository;

    @Override
    public void save(Payment payment) {
        ServiceOrderJpaEntity serviceOrderJpa = serviceOrderJpaRepository
                .findById(payment.getServiceOrder().getId())
                .orElseThrow(() -> new IllegalArgumentException("ServiceOrder not found for Payment"));
        paymentJpaRepository.save(PaymentMapper.toPersistence(payment, serviceOrderJpa));
    }

    @Override
    public Optional<Payment> findById(UUID id) {
        return paymentJpaRepository.findById(id)
                .map(paymentJpa -> {
                    var serviceOrderJpa = paymentJpa.getServiceOrder();
                    var quoteJpa = serviceOrderJpa.getQuote();
                    var vehicleJpa = quoteJpa.getVehicle();
                    var customerJpa = vehicleJpa.getCustomer();

                    var vehicles = VehicleMapper.toDomainList(customerJpa.getVehicles());
                    Customer customer = CustomerMapper.toDomain(customerJpa, vehicles);
                    Vehicle vehicle = VehicleMapper.toDomain(vehicleJpa);

                    List<IPayable> payables = quoteJpa.getPayables().stream()
                            .map(p -> PayablesMapper.toDomain(p, null, null))
                            .toList();

                    Quote quote = QuoteMapper.toDomain(quoteJpa, customer, vehicle, payables);

                    List<Task> tasks = List.of();
                    ServiceOrder serviceOrder = ServiceOrderMapper.toDomain(serviceOrderJpa, quote, tasks);

                    return PaymentMapper.toDomain(paymentJpa, serviceOrder);
                });
    }
}
