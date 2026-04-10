package com.logistic.shippingapp.service.impl;

import com.logistic.shippingapp.entity.Order;
import com.logistic.shippingapp.entity.Shipping;
import com.logistic.shippingapp.repository.ShippingRepository;
import com.logistic.shippingapp.service.ShippingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ShippingServiceImpl implements ShippingService {
    private final ShippingRepository shippingRepository;

    @Override
    public void createShipping(Order order, String address) {
        Shipping shipping = new Shipping();
        shipping.setOrder(order);
        shipping.setAddress(address);
        shipping.setTrackingNumber("TRK-" + System.currentTimeMillis());
        shipping.setStatus("PREPARING");
        shippingRepository.save(shipping);
    }
}