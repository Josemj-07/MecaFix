package com.mecafix.adapter.out.persistence.gateway;

import com.mecafix.adapter.out.persistence.entity.ProductDetailJpaEntity;
import com.mecafix.adapter.out.persistence.entity.QuoteJpaEntity;
import com.mecafix.adapter.out.persistence.entity.ServiceDetailJpaEntity;
import com.mecafix.adapter.out.persistence.mapper.*;
import com.mecafix.adapter.out.persistence.repository.*;
import com.mecafix.domain.model.contract.IPayable;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.model.entity.product.ProductDetail;
import com.mecafix.domain.model.entity.quote.Quote;
import com.mecafix.domain.model.entity.service.ServiceDetail;
import com.mecafix.domain.model.entity.vehicle.Vehicle;
import com.mecafix.domain.port.quote.QuoteRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class QuoteRepositoryGateway implements QuoteRepositoryPort {

    private final QuoteJpaRepository quoteJpaRepository;
    private final VehicleJpaRepository vehicleJpaRepository;
    private final ServiceJpaRepository serviceJpaRepository;
    private final ProductJpaRepository productJpaRepository;

    @Override
    public void save(Quote quote) {
        var vehicleJpa = vehicleJpaRepository.findById(quote.getVehicle().getId())
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found for Quote"));

        List<ProductDetailJpaEntity> productDetails = new ArrayList<>();
        List<ServiceDetailJpaEntity> serviceDetails = new ArrayList<>();

        // First create the QuoteJpaEntity (needed as FK reference for details)
        var quoteJpa = QuoteMapper.toPersistence(quote, vehicleJpa, productDetails, serviceDetails);

        // Convert domain payables to JPA entities with the quote reference
        for (IPayable payable : quote.getPayable()) {
            if (payable instanceof ServiceDetail sd) {
                var serviceJpa = serviceJpaRepository.findById(sd.getService().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Service not found"));
                serviceDetails.add(ServiceDetailMapper.toPersistence(sd, serviceJpa, quoteJpa));
            } else if (payable instanceof ProductDetail pd) {
                var productJpa = productJpaRepository.findById(pd.getProduct().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Product not found"));
                productDetails.add(ProductDetailMapper.toPersistence(pd, productJpa, quoteJpa));
            }
        }

        quoteJpaRepository.save(quoteJpa);
    }

    @Override
    public Optional<Quote> findById(UUID id) {
        return quoteJpaRepository.findById(id)
                .map(this::mapToDomain);
    }

    @Override
    public List<Quote> findByCustomerId(UUID customerId) {
        return quoteJpaRepository.findByVehicleCustomerId(customerId).stream()
                .map(this::mapToDomain)
                .toList();
    }

    private Quote mapToDomain(QuoteJpaEntity quoteJpa) {
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
                    throw new IllegalArgumentException("Unknown PayableJpa type: " + payableJpa.getClass());
                })
                .toList();

        return QuoteMapper.toDomain(quoteJpa, customer, vehicle, payables);
    }
}
