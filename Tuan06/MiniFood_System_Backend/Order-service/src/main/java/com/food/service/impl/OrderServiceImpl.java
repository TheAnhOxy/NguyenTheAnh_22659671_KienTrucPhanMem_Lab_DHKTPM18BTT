package com.food.service.impl;

import com.food.client.FoodClient;
import com.food.client.UserClient;
import com.food.dto.request.OrderRequest;
import com.food.dto.response.ApiResponse;
import com.food.dto.response.OrderResponse;
import com.food.entity.Order;
import com.food.repository.OrderRepository;
import com.food.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final FoodClient foodClient;
    private final UserClient userClient;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        // 1. Validate User (Gọi sang User Service - 8081)
        // Lưu ý: Nếu User Service trả về 404, Feign sẽ ném Exception
        try {
            userClient.validateUser(request.getUserId());
        } catch (Exception e) {
            throw new RuntimeException("Lỗi: Không tìm thấy người dùng hoặc User Service đang offline");
        }

        // 2. Lấy giá món ăn (Gọi sang Food Service - 8082)
        ApiResponse foodApi = foodClient.getFoodById(request.getFoodId());
        if (foodApi == null || foodApi.getData() == null) {
            throw new RuntimeException("Lỗi: Món ăn không tồn tại");
        }

        // Ép kiểu dữ liệu từ Map sang giá trị mong muốn
        Map<String, Object> foodData = (Map<String, Object>) foodApi.getData();
        Double price = Double.valueOf(foodData.get("price").toString());

        // 3. Tạo Entity Order
        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setFoodId(request.getFoodId());
        order.setQuantity(request.getQuantity());
        order.setTotalPrice(price * request.getQuantity());
        order.setPaymentMethod(request.getPaymentMethod());
        order.setStatus("PENDING");
        order.setCreatedAt(LocalDateTime.now());

        Order savedOrder = orderRepository.save(order);

        return modelMapper.map(savedOrder, OrderResponse.class);
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(order -> modelMapper.map(order, OrderResponse.class))
                .collect(Collectors.toList());
    }
}