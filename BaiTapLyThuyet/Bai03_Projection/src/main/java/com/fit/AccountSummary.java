package com.fit;

import lombok.Data;

@Data
class AccountSummary {
    private String accountId;
    private double balance = 0;
    private double totalDeposits = 0;
    private int transactionCount = 0;
}