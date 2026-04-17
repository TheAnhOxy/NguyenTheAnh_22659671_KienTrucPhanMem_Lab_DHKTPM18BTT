package com.fit;

import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Event> eventStore = Arrays.asList(
                new AccountCreated("ACC-X", 100), // 0
                new MoneyDeposited(50),           // 1
                new MoneyDeposited(50),           // 2 -> finstance  tạo Snapshot
                new MoneyWithdrawn(30),          // 3
                new MoneyDeposited(100),          // 4
                new MoneyWithdrawn(20),          // 5
                new MoneyDeposited(200),          // 6
                new MoneyWithdrawn(50),          // 7
                new MoneyDeposited(50),           // 8
                new MoneyWithdrawn(10)            // 9
        );

        AccountSnapshot savedSnapshot = new AccountSnapshot("ACC-X", 200, 200, 2);

        BankAccountWithSnapshot account = new BankAccountWithSnapshot();
        account.loadSnapshot(savedSnapshot);
        System.out.println("Bắt đầu Replay từ index: " + (savedSnapshot.getVersion() + 1));

        for (int i = savedSnapshot.getVersion() + 1; i < eventStore.size(); i++) {
            System.out.println("Replay event index: " + i);
            account.apply(eventStore.get(i), i);
        }

        System.out.println("\nSố dư cuối cùng: " + account.getBalance()); // 420.0
        System.out.println("Version hiện tại: " + account.getCurrentVersion());
    }
}