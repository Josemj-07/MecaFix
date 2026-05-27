package com.mecafix.domain.model.entity.order;

import com.mecafix.domain.model.entity.quote.Quote;
import com.mecafix.domain.model.enums.OrderStatus;
import com.mecafix.domain.exceptions.InvalidServiceOrderException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ServiceOrder {

    private final UUID id;
    private final Quote quote;
    private final List<Task> tasks;
    private OrderStatus orderStatus;
    private final LocalDateTime creationDate;

    public static ServiceOrder create(Quote quote, List<Task> tasks) {
        return new ServiceOrder(UUID.randomUUID(), quote, tasks, OrderStatus.CREATED, LocalDateTime.now());
    }

    public static ServiceOrder reBuild(
            UUID id,
            Quote quote,
            List<Task> tasks,
            OrderStatus orderStatus,
            LocalDateTime creationDate
    ) {
        return new ServiceOrder(id, quote, tasks, orderStatus, creationDate);
    }

    private ServiceOrder(
            UUID id,
            Quote quote,
            List<Task> tasks,
            OrderStatus orderStatus,
            LocalDateTime creationDate
    ) {

        validate(id, quote, tasks);

        if (orderStatus == null)
            throw new InvalidServiceOrderException("orderStatus must not be null");

        if (creationDate == null)
            throw new InvalidServiceOrderException("creationDate must not be null");

        this.id = id;
        this.quote = quote;
        this.tasks = new ArrayList<>(tasks); // copia defensiva
        this.orderStatus = orderStatus;
        this.creationDate = creationDate;
    }

    private void validate(UUID id, Quote quote, List<Task> tasks) {

        if (id == null)
            throw new InvalidServiceOrderException("id must not be null");

        if (quote == null)
            throw new InvalidServiceOrderException("quote must not be null");

        if (tasks == null || tasks.isEmpty())
            throw new InvalidServiceOrderException("tasks must not be empty");
    }

    public UUID getId() {
        return this.id;
    }
    public List<Task> getTasks() {
        return List.copyOf(this.tasks);
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public Quote getQuote() {
        return quote;
    }

    public void advanceOrderStatus() {
        this.orderStatus = this.orderStatus.nextOrderStatus();
    }

    public void addNewTasks(List<Task> newTasks) {

        if (newTasks == null || newTasks.isEmpty()) {
            throw new InvalidServiceOrderException("tasks must not be empty");
        }

        for (Task task : newTasks) {
            addNewTask(task);
        }
    }

    public void addNewTask(Task newTask) {

        if (newTask == null) {
            throw new InvalidServiceOrderException("task must not be null");
        }

        if (this.orderStatus != OrderStatus.CREATED) {
            throw new InvalidServiceOrderException("cannot add task in this current state");
        }

        this.tasks.add(newTask);
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ServiceOrder that)) return false;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

}