package com.bank;

import java.util.ArrayList;
import java.util.List;

public class BankAccountWithTimeTravel {
    private final List<Event> eventStore = new ArrayList<>();

    public void addEvent(Event event) {
        eventStore.add(event);
    }
    public double getStateAt(int index) {
        if (index < 0 || index >= eventStore.size()) {
            throw new IllegalArgumentException("Index không hợp lệ");
        }
        double tempBalance = 0;
        for (int i = 0; i <= index; i++) {
            Event event = eventStore.get(i);
            if (event instanceof AccountCreated e) {
                tempBalance = e.getInitialBalance();
            } else if (event instanceof MoneyDeposited e) {
                tempBalance += e.getAmount();
            } else if (event instanceof MoneyWithdrawn e) {
                tempBalance -= e.getAmount();
            }
        }
        return tempBalance;
    }

    public void undoLastEvent() {
        if (!eventStore.isEmpty()) {
            Event removed = eventStore.remove(eventStore.size() - 1);
            System.out.println("Đã Undo sự kiện: " + removed.getClass().getSimpleName());
        } else {
            System.out.println("Không còn gì để Undo!");
        }
    }

    public double getCurrentBalance() {
        if (eventStore.isEmpty()) return 0;
        return getStateAt(eventStore.size() - 1);
    }

    public List<Event> getHistory() {
        return eventStore;
    }
}