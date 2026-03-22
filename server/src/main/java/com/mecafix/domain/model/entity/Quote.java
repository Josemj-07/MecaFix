
package com.mecafix.domain.model.entity;


import com.mecafix.domain.model.enums.QuoteStatus;
import com.mecafix.shared.exceptions.InvalidQuoteException;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Quote {

    private final Long id;
    private final Customer customer;
    private final Vehicle vehicle;
    private List<ServiceDetail> services;
    private List<QuoteProductDetail> products;
    private QuoteStatus status;
    private BigDecimal totalAmount;
    private final LocalDateTime date;

    public Quote(Long id, Customer customer, Vehicle vehicle, List<ServiceDetail> services, List<QuoteProductDetail> products) {

        if (id == null || id <= 0) {
            throw new InvalidQuoteException("Id must be a positive number");
        }
        if (customer == null) {
            throw new InvalidQuoteException("Customer must not be null");
        }
        if (vehicle == null) {
            throw new InvalidQuoteException("Vehicle must not be null");
        }
        if (services == null || services.isEmpty()) {
            throw new InvalidQuoteException("Quote must have at least one service");
        }

        this.id = id;
        this.customer = customer;
        this.vehicle = vehicle;
        this.services = new ArrayList<>(services);
        this.products = products != null ? new ArrayList<>(products) : new ArrayList<>();
        this.status = QuoteStatus.PENDING;
        this.date = LocalDateTime.now();
        this.totalAmount = BigDecimal.ZERO;
        updateTotal();
    }
    
    

    public void addService(ServiceDetail serviceDetail) {
        if (serviceDetail == null) {
            throw new InvalidQuoteException("Service detail must not be null");
        }
        if (status != QuoteStatus.PENDING) {
            throw new InvalidQuoteException("Cannot modify a quote that is not pending");
        }
        services.add(serviceDetail);
        updateTotal();
    }

    public void addProduct(QuoteProductDetail productDetail) {
        if (productDetail == null) {
            throw new InvalidQuoteException("Product detail must not be null");
        }
        if (status != QuoteStatus.PENDING) {
            throw new InvalidQuoteException("Cannot modify a quote that is not pending");
        }
        products.add(productDetail);
        updateTotal();
    }

    public void removeService(ServiceDetail serviceDetail) {
        if (serviceDetail == null) {
            throw new InvalidQuoteException("Service detail must not be null");
        }
        if (status != QuoteStatus.PENDING) {
            throw new InvalidQuoteException("Cannot modify a quote that is not pending");
        }
        if (services.size() == 1) {
            throw new InvalidQuoteException("Quote must have at least one service");
        }
        services.remove(serviceDetail);
        updateTotal();
    }

    public void removeProduct(QuoteProductDetail productDetail) {
        if (productDetail == null) {
            throw new InvalidQuoteException("Product detail must not be null");
        }
        if (status != QuoteStatus.PENDING) {
            throw new InvalidQuoteException("Cannot modify a quote that is not pending");
        }
        products.remove(productDetail);
        updateTotal();
    }


    public void approve() {
        if (status != QuoteStatus.PENDING) {
            throw new InvalidQuoteException("Only a pending quote can be approved");
        }
        this.status = QuoteStatus.APPROVED;
    }

    public void reject() {
        if (status != QuoteStatus.PENDING) {
            throw new InvalidQuoteException("Only a pending quote can be rejected");
        }
        this.status = QuoteStatus.REJECTED;
    }

    public void updateTotal() {
        BigDecimal servicesTotal = services.stream()
                .map(ServiceDetail::calculateSubTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal productsTotal = products.stream()
                .