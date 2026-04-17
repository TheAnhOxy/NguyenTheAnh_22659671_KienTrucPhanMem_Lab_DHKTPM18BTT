package com.fit;

record ItemRemoved(String itemName, double price) implements Event {}