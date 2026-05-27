package com.mecafix.adapter.out.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name="product_detail")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ProductDetailJpaEntity implements PayableJpa{
    @Id
    private UUID id;
    @Column(name="quantity", nullable = false)
    private long quantity;

    @Column(name="appliedprice", nullable = false)
    private BigDecimal appliedPrice;

    @OneToOne
    @JoinColumn(name="id_product", nullable = false)
    private ProductJpaEntity product;

    @ManyToOne
    @JoinColumn(name="id_quote")
    private QuoteJpaEntity quote;

}
