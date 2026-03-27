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
        return new ServiceOrder(quote, tasks);
    }

    private ServiceOrder(Quote quote, List<Task> tasks) {
        if(quote == null) throw new InvalidServiceOrderException("quote must not be null");
        if(tasks == null || tasks.isEmpty()) throw new InvalidServiceOrderException("tasks must not be empty");
        this.id = UUID.randomUUID();
        this.quote = quote;
        this.tasks = tasks;
        this.orderStatus = OrderStatus.CREATED;
        this.creationDate = LocalDateTime.now();
    }

    public List<Task> getTasks() {return List.copyOf(this.tasks);}

    public UUID getId() {return this.id;}

    public LocalDateTime getCreationDate(){return this.creationDate;}

    public OrderStatus getOrderStatus() {return this.orderStatus;}

    public Quote getQuote() {return this.quote;}

    public void advanceOrderStatus(){
        this.orderStatus = this.orderStatus.nextOrderStatus();
    }

    public void addNewTask(List<Task> newTasks) {
        if (newTasks == null || newTasks.isEmpty()) {
            throw new InvalidServiceOrderException("tasks must not be empty");
        }

        if (this.orderStatus != OrderStatus.CREATED) {
            throw new InvalidServiceOrderException("cannot add task in this current state");
        }
        this.tasks.addAll(newTasks);
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
        if (!(o instanceof ServiceOrder)) return false;
        ServiceOrder that = (ServiceOrder) o;

        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return this.id.hashCode();
    }
}
