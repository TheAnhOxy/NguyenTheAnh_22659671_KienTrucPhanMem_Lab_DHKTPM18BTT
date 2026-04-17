package com.fit;

record OrderCreated(String orderId, String customerName) implements Event {}