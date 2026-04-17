package com.fit;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter @AllArgsConstructor
class AccountSnapshot {
    private final String accountId;
    private final double balance;
    private final double totalDeposits;
    private final int version;
}