package com.example.fashionar.service;

import com.example.fashionar.exception.ResourceNotFoundException;
import com.example.fashionar.model.Product;
import com.example.fashionar.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getFeaturedProducts() {
        return productRepository.findByFeaturedTrue();
    }

    public Product getProduct(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updated) {
        Product existing = getProduct(id);
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setImageUrl(updated.getImageUrl());
        existing.setPrice(updated.getPrice());
        existing.setFeatured(updated.isFeatured());
        return productRepository.save(existing);
    }

    public void deleteProduct(Long id) {
        productRepository.delete(getProduct(id));
    }
}