package com.mecafix.adapter.out.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name="product")
@NoArgsConstructor
@Getter
@AllArgsConstructor
public class ProductJpaEntity {
    @Id
    private UUID ID;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="description", nullable = false)
    private String description;

    @Column(name="purchaseprice", nullable = false)
    private BigDecimal purchasePrice;

    @Column(name="saleprice", nullable = false)
    private BigDecimal salePrice;

    @Column(name="stock", nullable = false)
    private long stock;

    @OneToOne
    @JoinColumn(name="id_category")
    private CategoryJpaEntity category;
}
