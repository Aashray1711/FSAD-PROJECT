package com.example.fashionar.repository;

import com.example.fashionar.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByFeaturedTrue();
}