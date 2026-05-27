package com.mecafix.domain.model.enums;

import com.mecafix.domain.exceptions.InvalidOrderStatusException;

public enum OrderStatus {
    CREATED("CREATED") {
        @Override
        public OrderStatus nextOrderStatus() {
            return OrderStatus.IN_PROGRESS;
        }
    },
    IN_PROGRESS("IN_PROGRESS") {
        @Override
        public OrderStatus nextOrderStatus() {
            return OrderStatus.FINALIZED;
        }
    },
    FINALIZED("FINALIZED") {
        @Override
        public OrderStatus nextOrderStatus() {
            return OrderStatus.DELIVERED;
        }
    },
    DELIVERED("DELIVERED") {
        @Override
        public OrderStatus nextOrderStatus() {
            throw new InvalidOrderStatusException("CAN_NOT_ADVANCE");
        }
    },
    CANCELED("CANCELED") {
        @Override
        public OrderStatus nextOrderStatus() {
            throw new InvalidOrderStatusException("CAN_NOT_ADVANCE");
        }
    };

    private final String name;

    OrderStatus(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public abstract OrderStatus nextOrderStatus();
}