package com.fit;

import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Event> eventStore = new ArrayList<>();
        AccountProjection projection = new AccountProjection();
        System.out.println("--- Đang xử lý các giao dịch ---");

        handleAction(new AccountCreated("ACC-123", 500), eventStore, projection);
        handleAction(new MoneyDeposited(1000), eventStore, projection);
        handleAction(new MoneyWithdrawn(200), eventStore, projection);
        handleAction(new MoneyDeposited(300), eventStore, projection);

        AccountSummary result = projection.getSummary();

        System.out.println("\n--- KẾT QUẢ READ MODEL (ACCOUNT SUMMARY) ---");
        System.out.println("ID Tài khoản: " + result.getAccountId());
        System.out.println("Số dư hiện tại: " + result.getBalance());
        System.out.println("Tổng số tiền đã nạp: " + result.getTotalDeposits());
        System.out.println("Tổng số giao dịch: " + result.getTransactionCount());
    }

    private static void handleAction(Event event, List<Event> store, AccountProjection proj) {
        store.add(event);
        proj.project(event);
    }
}