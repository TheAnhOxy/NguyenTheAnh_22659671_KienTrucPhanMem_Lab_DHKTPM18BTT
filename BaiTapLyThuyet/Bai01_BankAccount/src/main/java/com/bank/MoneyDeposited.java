package com.bank;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
class MoneyDeposited implements Event {
    private final double amount;
}