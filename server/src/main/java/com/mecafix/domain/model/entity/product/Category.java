package com.mecafix.domain.model.entity.product;

import com.mecafix.domain.exceptions.InvalidCategoryException;

import java.util.UUID;

public class Category {
    private final UUID id;
    private final String name;

    public static Category create(String name) {
        return new Category(name);
    }

    private Category(String name) {
        name = name == null ? null : name.trim();
        if (name == null || name.isBlank()) {
            throw new InvalidCategoryException("Name must not be empty");
        }

        this.id = UUID.randomUUID();
        this.name = name;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Category)) return false;
        Category that = (Category) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}