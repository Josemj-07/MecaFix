package com.mecafix.adapter.out.persistence.gateway;

import com.mecafix.adapter.out.persistence.entity.ProductDetailJpaEntity;
import com.mecafix.adapter.out.persistence.entity.QuoteJpaEntity;
import com.mecafix.adapter.out.persistence.entity.ServiceDetailJpaEntity;
import com.mecafix.adapter.out.persistence.entity.ServiceOrderJpaEntity;
import com.mecafix.adapter.out.persistence.mapper.*;
import com.mecafix.adapter.out.persistence.repository.MechanicJpaRepository;
import com.mecafix.adapter.out.persistence.repository.QuoteJpaRepository;
import com.mecafix.adapter.out.persistence.repository.ServiceJpaRepository;
import com.mecafix.adapter.out.persistence.repository.ServiceOrderJpaRepository;
import com.mecafix.adapter.out.persistence.repository.TaskJpaRepository;
import com.mecafix.domain.model.contract.IPayable;
import com.mecafix.domain.model.entity.order.ServiceOrder;
import com.mecafix.domain.model.entity.order.Task;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.model.entity.quote.Quote;
import com.mecafix.domain.model.entity.service.ServiceDetail;
import com.mecafix.domain.model.entity.vehicle.Vehicle;
import com.mecafix.domain.port.serviceorder.ServiceOrderRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class ServiceOrderRepositoryGateway implements ServiceOrderRepositoryPort {

    private final ServiceOrderJpaRepository serviceOrderJpaRepository;
    private final QuoteJpaRepository quoteJpaRepository;
    private final TaskJpaRepository taskJpaRepository;
    private final MechanicJpaRepository mechanicJpaRepository;
    private final ServiceJpaRepository serviceJpaRepository;

    @Override
    public void save(ServiceOrder serviceOrder) {
        var quoteJpa = quoteJpaRepository.findById(serviceOrder.getQuote().getId())
                .orElseThrow(() -> new IllegalArgumentException("Quote not found for ServiceOrder"));
        var serviceOrderJpa = ServiceOrderMapper.toPersistence(serviceOrder, quoteJpa);
        serviceOrderJpaRepository.save(serviceOrderJpa);

        // Persist tasks with mechanic and service references
        for (var task : serviceOrder.getTasks()) {
            var mechanicJpa = mechanicJpaRepository.findById(task.getMechanic().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Mechanic not found for Task"));
            var serviceJpa = serviceJpaRepository.findById(task.getServiceDetail().getService().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Service not found for Task"));
            taskJpaRepository.save(TaskMapper.toPersistence(task, mechanicJpa, serviceOrderJpa, serviceJpa));
        }
    }

    @Override
    public Optional<ServiceOrder> findById(UUID id) {
        return serviceOrderJpaRepository.findById(id)
                .map(this::mapToDomain);
    }

    @Override
    public List<ServiceOrder> findAll() {
        return serviceOrderJpaRepository.findAll().stream()
                .map(this::mapToDomain)
                .toList();
    }

    private ServiceOrder mapToDomain(ServiceOrderJpaEntity serviceOrderJpa) {
        Quote quote = rebuildQuote(serviceOrderJpa.getQuote());

        List<Task> tasks = taskJpaRepository.findByServiceOrderId(serviceOrderJpa.getId()).stream()
                .map(taskJpa -> {
                    var mechanic = MechanicMapper.toDomain(taskJpa.getMechanic());
                    // Rebuild ServiceDetail from the persisted Service reference
                    var service = ServiceMapper.toDomain(taskJpa.getService());
                    var serviceDetail = ServiceDetail.reBuild(UUID.randomUUID(), service);
                    return TaskMapper.toDomain(taskJpa, mechanic, serviceDetail);
                })
                .toList();

        return ServiceOrderMapper.toDomain(serviceOrderJpa, quote, tasks);
    }

    private Quote rebuildQuote(QuoteJpaEntity quoteJpa) {
        var vehicleJpa = quoteJpa.getVehicle();
        var customerJpa = vehicleJpa.getCustomer();

        var vehicles = VehicleMapper.toDomainList(customerJpa.getVehicles());
        Customer customer = CustomerMapper.toDomain(customerJpa, vehicles);
        Vehicle vehicle = VehicleMapper.toDomain(vehicleJpa);

        List<IPayable> payables = quoteJpa.getPayables().stream()
                .map(payableJpa -> {
                    if (payableJpa instanceof ProductDetailJpaEntity pd) {
                        var category = CategoryMapper.toDomain(pd.getProduct().getCategory());
                        var product = ProductMapper.toDomain(pd.getProduct(), category);
                        return PayablesMapper.toDomain(payableJpa, product, null);
                    }
                    if (payableJpa instanceof ServiceDetailJpaEntity sd) {
                        var service = ServiceMapper.toDomain(sd.getService());
                        return PayablesMapper.toDomain(payableJpa, null, service);
                    }
                    throw new IllegalArgumentException("Unknown PayableJpa type");
                })
                .toList();

        return QuoteMapper.toDomain(quoteJpa, customer, vehicle, payables);
    }
}
