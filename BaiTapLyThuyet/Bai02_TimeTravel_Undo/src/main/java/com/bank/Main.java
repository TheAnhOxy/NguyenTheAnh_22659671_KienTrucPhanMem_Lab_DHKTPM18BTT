package com.bank;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        BankAccountWithTimeTravel account = new BankAccountWithTimeTravel();

        account.addEvent(new AccountCreated("ACC-99", 1000)); // Index 0: 1000
        account.addEvent(new MoneyDeposited(500));            // Index 1: 1500
        account.addEvent(new MoneyWithdrawn(200));           // Index 2: 1300
        account.addEvent(new MoneyDeposited(100));            // Index 3: 1400

        System.out.println("Số dư hiện tại: " + account.getCurrentBalance()); // 1400

        System.out.println("--- Xem lại lịch sử ---");
        System.out.println("Trạng thái lúc mới tạo (Index 0): " + account.getStateAt(0)); // 1000
        System.out.println("Sau khi nạp 500 (Index 1): " + account.getStateAt(1));       // 1500

        System.out.println("--- Thực hiện Undo ---");
        account.undoLastEvent();
        System.out.println("Số dư sau khi Undo: " + account.getCurrentBalance()); // 1300

        account.undoLastEvent();
        System.out.println("Số dư sau khi Undo lần nữa: " + account.getCurrentBalance()); // 1500
    }
}