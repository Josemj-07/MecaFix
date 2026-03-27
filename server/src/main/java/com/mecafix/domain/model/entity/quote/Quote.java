
package com.mecafix.domain.model.entity.quote;

import com.mecafix.domain.model.contract.IPagable;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.model.entity.person.Person;
import com.mecafix.domain.model.entity.vehicle.Vehicle;
import com.mecafix.domain.model.enums.QuoteStatus;
import com.mecafix.domain.exceptions.InvalidQuoteException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Quote {
    private final UUID id;
    private final Customer customer;
    private final Vehicle vehicle;
    private final List<IPagable> payable;
    private QuoteStatus status;
    private BigDecimal totalAmount;
    private final LocalDateTime createdDate;

    public static Quote create(Customer customer, Vehicle vehicle, List<IPagable> payable) {
        return new Quote(customer, vehicle, payable);
    }

    /**
     * Creates a new quote with the specified customer, vehicle, and payable items.
     * A quote can be created empty and items can be added later.
     * A quote can only be approved if it contains at least one payable item.
     *
     * @param customer the customer requesting the quote (must not be null)
     * @param vehicle the vehicle for the quote (must not be null)
     * @param payable list of payable items (can be null or empty)
     * @throws InvalidQuoteException if customer or vehicle is null
     */

    private Quote(Customer customer, Vehicle vehicle, List<IPagable> payable) {

        if (customer == null) {
            throw new InvalidQuoteException("Customer must not be null");
        }
        if (vehicle == null) {
            throw new InvalidQuoteException("Vehicle must not be null");
        }

        this.id = UUID.randomUUID();
        this.customer = customer;
        this.vehicle = vehicle;
        this.payable = payable != null ? payable: new ArrayList<IPagable>();
        this.status = QuoteStatus.PENDING;
        this.createdDate = LocalDateTime.now();
        this.totalAmount = calculateTotal();

    }

    public void addPayable(IPagable payable) {
        if(payable == null) throw new InvalidQuoteException("Payable object must not be null");
        if(this.status != QuoteStatus.PENDING) throw new InvalidQuoteException("Cannot add anything if the quote is not pending");
        this.payable.add(payable);
        this.totalAmount = calculateTotal();
    }

    public void removePayable(IPagable payable) {
        if(payable == null) throw new InvalidQuoteException("Payable object must not be null");
        if(status != QuoteStatus.PENDING)  throw new InvalidQuoteException("Cannot remove anything if the quote is not pending");
        if(!this.payable.contains(payable)) throw new InvalidQuoteException("Payable object does not exist in the quote");
        this.payable.remove(payable);
        this.totalAmount = calculateTotal();
    }

    public void approve() {
        if (status != QuoteStatus.PENDING) {
            throw new InvalidQuoteException("Only a pending quote can be approved");
        }
        if(this.payable.isEmpty()) {
            throw new InvalidQuoteException("Cannot approve the quote due to it hasn't payables");
        }
        this.status = QuoteStatus.APPROVED;
    }

    public void reject() {
        if (status != QuoteStatus.PENDING) {
            throw new InvalidQuoteException("Only a pending quote can be rejected");
        }
        this.status = QuoteStatus.REJECTED;
    }

    private BigDecimal calculateTotal() {
        return this.payable.stream()
                .map(IPagable::calculateSubTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }


    public UUID getId() {
        return id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public QuoteStatus getStatus() {
        return status;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public List<IPagable> getPayable() {
        return List.copyOf(this.payable);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Quote)) return false;
        Quote that = (Quote) o;
        return this.id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

}