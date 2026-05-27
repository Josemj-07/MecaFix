package com.mecafix.adapter.out.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name="service_detail")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDetailJpaEntity implements PayableJpa {
    @Id
    private UUID id;

    @Column(name="appliedprice", nullable = false)
    private BigDecimal appliedPrice;

    @JoinColumn(name="id_service", nullable = false)
    @OneToOne
    private ServiceJpaEntity service;

    @ManyToOne
    @JoinColumn(name="id_quote")
    private QuoteJpaEntity quote;

}
