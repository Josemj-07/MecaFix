package com.mecafix.domain.model.enums;

import com.mecafix.domain.exceptions.InvalidOrderStatusException;

public enum OrderStatus {
    CREATED {
        @Override
        public OrderStatus nextOrderStatus() {
            return OrderStatus.IN_PROGRESS;
        }
    },
    IN_PROGRESS {
        @Override
        public OrderStatus nextOrderStatus() {
            return OrderStatus.FINALIZED;
        }
    },
    FINALIZED {
        @Override
        public OrderStatus nextOrderStatus() {
            return OrderStatus.DELIVERED;
        }
    },
    DELIVERED {
        @Override
        public OrderStatus nextOrderStatus() {
            throw new InvalidOrderStatusException("CAN_NOT_ADVANCE");
        }
    },
    CANCELED {
        @Override
        public OrderStatus nextOrderStatus() {
            throw new InvalidOrderStatusException("CAN_NOT_ADVANCE");
        }
    };

    public abstract OrderStatus nextOrderStatus();
}