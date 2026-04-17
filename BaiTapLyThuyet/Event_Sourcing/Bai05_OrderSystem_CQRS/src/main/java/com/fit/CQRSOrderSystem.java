package com.fit;

public class CQRSOrderSystem {
    public static void main(String[] args) {

        OrderProjection readSide = new OrderProjection();

        OrderAggregate orderCmd = new OrderAggregate("ORD-001");
        orderCmd.addItem("Laptop", 1200.0);
        orderCmd.addItem("Mouse", 50.0);
        orderCmd.confirmOrder();

        System.out.println("--- Đồng bộ hóa dữ liệu ---");
        for (Event event : orderCmd.getUncommittedChanges()) {
            readSide.on(event, "ORD-001");
        }

        OrderView summary = readSide.getById("ORD-001");

        System.out.println("ID Đơn hàng: " + summary.getOrderId());
        System.out.println("Trạng thái: " + summary.getStatus());
        System.out.println("Tổng tiền: $" + summary.getTotalPrice());
    }
}