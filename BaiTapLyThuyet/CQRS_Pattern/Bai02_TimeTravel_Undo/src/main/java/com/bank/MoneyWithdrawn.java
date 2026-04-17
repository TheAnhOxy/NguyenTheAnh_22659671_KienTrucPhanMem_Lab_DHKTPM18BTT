package com.bank;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
class MoneyWithdrawn implements Event {
    private final double amount;
}