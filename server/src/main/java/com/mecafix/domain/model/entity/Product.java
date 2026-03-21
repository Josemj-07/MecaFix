package com.mecafix.domain.model.entity;

import com.mecafix.shared.exceptions.InvalidProductException;

public class Product {

    private Long idProduct;
    private final String name;
    private String description;
    private Price price;
    private int stock;

    public Product(Long idProduct, String name, String description, Price price, int stock) {
        if(idProduct == null || name == null || name.isBlank() ||description == null || price == null || stock < 0 || idProduct < 0) {
            throw new InvalidProductException();
        }
        this.idProduct = idProduct;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }

    public Long getIdProduct() {return this.idProduct;}
    public String getName() {return this.name;}
    public String getDescription() {return this.description;}
    public Price getPrice() {return this.price;}
    public int getStock() {return this.stock;}

    public void increaseStock(int n) {
        if(n <= 0) {
            throw new IllegalArgumentException("INVALID_VALUE_OF_STOCK");
        }
        this.stock += n;
    }

    public void decreaseStock(int n) {
        if(n <= 0 || n > this.stock) {
            throw new IllegalArgumentException("INVALID_VALUE_OF_STOCK");
        }
        this.stock -= n;
    }

}