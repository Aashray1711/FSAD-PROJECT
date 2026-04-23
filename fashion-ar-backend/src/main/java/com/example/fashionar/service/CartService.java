package com.example.fashionar.service;

import com.example.fashionar.model.CartItem;
import com.example.fashionar.repository.CartItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartItemRepository cartItemRepository;

    public CartService(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    public List<CartItem> getCartItems() {
        return cartItemRepository.findAll();
    }

    public CartItem addCartItem(CartItem item) {
        return cartItemRepository.save(item);
    }

    public void removeCartItem(Long id) {
        cartItemRepository.deleteById(id);
    }

    public void clearCart() {
        cartItemRepository.deleteAll();
    }
}