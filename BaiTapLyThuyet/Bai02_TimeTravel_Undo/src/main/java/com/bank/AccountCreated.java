package com.bank;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
class AccountCreated implements Event {
    private final String accountId;
    private final double initialBalance;
}