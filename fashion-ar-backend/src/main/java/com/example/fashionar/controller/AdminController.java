package com.example.fashionar.controller;

import com.example.fashionar.model.Order;
import com.example.fashionar.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final OrderService orderService;

    public AdminController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order saved = orderService.createOrder(order);
        return ResponseEntity.ok(saved);
    }
}