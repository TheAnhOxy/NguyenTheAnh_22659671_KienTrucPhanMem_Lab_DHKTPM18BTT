package com.fit;

import java.util.ArrayList;
import java.util.List;

public class BankAccountWithSnapshot {
    private String accountId;
    private double balance;
    private double totalDeposits;
    private int currentVersion = -1;

    public void loadSnapshot(AccountSnapshot snapshot) {
        this.accountId = snapshot.getAccountId();
        this.balance = snapshot.getBalance();
        this.totalDeposits = snapshot.getTotalDeposits();
        this.currentVersion = snapshot.getVersion();
        System.out.println("--- Đã nạp Snapshot tại Version: " + currentVersion + " ---");
    }
    public void apply(Event event, int eventIndex) {
        if (event instanceof AccountCreated e) {
            this.accountId = e.getAccountId();
            this.balance = e.getInitialBalance();
            this.totalDeposits = e.getInitialBalance();
        } else if (event instanceof MoneyDeposited e) {
            this.balance += e.getAmount();
            this.totalDeposits += e.getAmount();
        } else if (event instanceof MoneyWithdrawn e) {
            this.balance -= e.getAmount();
        }
        this.currentVersion = eventIndex;
    }


    public AccountSnapshot createSnapshot() {
        return new AccountSnapshot(accountId, balance, totalDeposits, currentVersion);
    }


    public double getBalance() { return balance; }
    public int getCurrentVersion() { return currentVersion; }
}