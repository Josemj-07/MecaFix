package com.mecafix.domain.model.entity.product;

import com.mecafix.domain.model.entity.quote.Quote;
import com.mecafix.domain.model.valueobject.Price;
import com.mecafix.domain.exceptions.InvalidProductException;

import java.util.UUID;

public class Product {
    private final UUID id;
    private final String name;
    private final String description;
    private Price price;
    private int stock;
    private final Category category;

    public static Product create(String name, String description, Price price, int stock, Category category) {
        return new Product(name, description, price, stock, category);
    }

    private Product(String name, String description, Price price, int stock, Category category) {
        name = name == null ? null : name.trim();
        if(name == null || name.isBlank()) throw new InvalidProductException("the field name must not be empty");

        description= description== null ? null : description.trim();
        if(description == null || description.isBlank()) throw new InvalidProductException("description must not be empty");

        if(price == null) throw new InvalidProductException("Price must not be null");

        if(stock < 0) throw new InvalidProductException("Stock must not be less than zero");

        this.id = UUID.randomUUID();
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
    }

    public UUID  getId() {return this.id;}

    public String getName() {return this.name;}

    public String getDescription() {return this.description;}

    public Price getPrice() {return this.price;}

    public int getStock() {return this.stock;}

    public Category getCategory() {
        return category;
    }

    public void setPrice(Price newPrice) {
        if(newPrice == null) throw new InvalidProductException("newPrice must not be null");
        this.price = newPrice;
    }

    public void increaseStock(int n) {
        if(n <= 0) throw new InvalidProductException("value must not be less than zero");
        this.stock += n;
    }

    public void decreaseStock(int n) {
        if(n <= 0) throw new InvalidProductException("value must not be less than zero");
        if(n > this.stock) throw new InvalidProductException("value must not be greater than the actual stock");
        this.stock -= n;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Product)) return false;
        Product that = (Product) o;
        return this.id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

}