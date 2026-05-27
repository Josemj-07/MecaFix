package com.mecafix.adapter.out.persistence.entity;

import com.mecafix.domain.model.enums.PaymentMethod;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "payment")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentJpaEntity {
    @Id
    private UUID id;

    @Column(name="amounttopay", nullable = false)
    private BigDecimal amountToPay;

    @Column(name = "amountreceived", nullable = false)
    private BigDecimal amountReceived;

    @Column(name = "date", nullable = false)
    private LocalDateTime date;

    @Column(name = "paymentmethod", nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @OneToOne
    @JoinColumn(name = "id_service_order")
    private ServiceOrderJpaEntity serviceOrder;
}
