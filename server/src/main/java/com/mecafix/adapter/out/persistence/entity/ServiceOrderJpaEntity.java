package com.mecafix.adapter.out.persistence.entity;

import com.mecafix.domain.model.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "service_order")
@NoArgsConstructor
@Getter
@AllArgsConstructor
public class ServiceOrderJpaEntity {
    @Id
    private UUID id;

    @Column(name = "orderstatus", nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @Column(name = "creationdate", nullable = false)
    private LocalDateTime creationDate;

    @OneToOne
    @JoinColumn(name = "id_quote")
    private QuoteJpaEntity quote;
}
