package com.mecafix.adapter.out.persistence.entity;

import com.mecafix.domain.model.enums.QuoteStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "quote")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class QuoteJpaEntity {
    @Id
    private UUID id;

    @OneToOne
    @JoinColumn(name = "id_vehicle")
    private VehicleJpaEntity vehicle;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private QuoteStatus orderStatus;

    @Column(name = "totalamount", nullable = false)
    private BigDecimal totalAmount;

    @Column(name = "creationdate", nullable = false)
    private LocalDateTime creationDate;

    @OneToMany(mappedBy = "quote", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductDetailJpaEntity> productDetail = new ArrayList<>();

    @OneToMany(mappedBy = "quote", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ServiceDetailJpaEntity> serviceDetail = new ArrayList<>();

    public List<PayableJpa> getPayables() {
        List<PayableJpa> payableJpa = new ArrayList<>();
        payableJpa.addAll(this.productDetail);
        payableJpa.addAll(this.serviceDetail);

        return payableJpa;
    }
}
