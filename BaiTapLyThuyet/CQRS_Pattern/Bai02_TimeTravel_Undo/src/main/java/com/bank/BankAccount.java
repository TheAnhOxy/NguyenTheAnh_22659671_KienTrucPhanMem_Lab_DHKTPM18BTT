package com.bank;

import java.util.ArrayList;
import java.util.List;

public class BankAccount {
    private String accountId;
    private double balance;

    private final List<Event> changes = new ArrayList<>();


    private void apply(Event event) {
        if (event instanceof AccountCreated e) {
            this.accountId = e.getAccountId();
            this.balance = e.getInitialBalance();
        } else if (event instanceof MoneyDeposited e) {
            this.balance += e.getAmount();
        } else if (event instanceof MoneyWithdrawn e) {
            this.balance -= e.getAmount();
        }
    }


    public void replay(List<Event> history) {
        history.forEach(this::apply);
    }

    public void createAccount(String id, double initial) {
        saveAndApply(new AccountCreated(id, initial));
    }

    public void deposit(double amount) {
        saveAndApply(new MoneyDeposited(amount));
    }

    public void withdraw(double amount) {
        if (amount <= balance) {
            saveAndApply(new MoneyWithdrawn(amount));
        } else {
            System.out.println("Lỗi: Không đủ tiền để rút " + amount);
        }
    }

    private void saveAndApply(Event event) {
        changes.add(event);
        apply(event);
    }

    public double getBalance() {
        return balance;
    }

    public List<Event> getChanges() {
        return changes;
    }
}