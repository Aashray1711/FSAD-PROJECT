package com.example.fashionar.controller;

import com.example.fashionar.model.CartItem;
import com.example.fashionar.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public List<CartItem> getCart() {
        return cartService.getCartItems();
    }

    @PostMapping
    public CartItem addItem(@RequestBody CartItem item) {
        return cartService.addCartItem(item);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeItem(@PathVariable Long id) {
        cartService.removeCartItem(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart() {
        cartService.clearCart();
        return ResponseEntity.noContent().build();
    }
}