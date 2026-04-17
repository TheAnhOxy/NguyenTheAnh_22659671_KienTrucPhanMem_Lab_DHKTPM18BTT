package com.bank;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        // --- PHẦN 1: Tạo lịch sử sự kiện ---
        BankAccount account = new BankAccount();
        account.createAccount("ACC-001", 1000); // +1000
        account.deposit(500);                   // +500
        account.withdraw(200);                  // -200
        account.deposit(100);                   // +100

        List<Event> eventStore = account.getChanges();
        System.out.println("Số lượng sự kiện đã lưu: " + eventStore.size());

        BankAccount restoredAccount = new BankAccount();

        System.out.println("Số dư trước khi replay: " + restoredAccount.getBalance());

        restoredAccount.replay(eventStore);

        System.out.println("Số dư sau khi replay: " + restoredAccount.getBalance());

        //1000 + 500 - 200 + 100 = 1400
        if (restoredAccount.getBalance() == 1400.0) {
            System.out.println("=> Kết quả chính xác!");
        }
    }
}