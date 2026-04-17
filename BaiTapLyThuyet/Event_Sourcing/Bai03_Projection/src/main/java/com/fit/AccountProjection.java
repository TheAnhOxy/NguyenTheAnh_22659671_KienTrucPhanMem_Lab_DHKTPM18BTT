package com.fit;

public class AccountProjection {

    private final AccountSummary summary = new AccountSummary();

    public void project(Event event) {
        if (event instanceof AccountCreated e) {
            summary.setAccountId(e.getAccountId());
            summary.setBalance(e.getInitialBalance());
            summary.setTotalDeposits(e.getInitialBalance());
        }
        else if (event instanceof MoneyDeposited e) {
            summary.setBalance(summary.getBalance() + e.getAmount());
            summary.setTotalDeposits(summary.getTotalDeposits() + e.getAmount());
        }
        else if (event instanceof MoneyWithdrawn e) {
            summary.setBalance(summary.getBalance() - e.getAmount());
        }

        summary.setTransactionCount(summary.getTransactionCount() + 1);
    }

    public AccountSummary getSummary() {
        return summary;
    }
}