package com.example.fashionar.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private String modelUrl;       // NEW: 3D model
    private String modelType;      // NEW: type of product (dress, jacket, etc.)
    private BigDecimal price;
    private boolean featured;

    public Product() {}

    public Product(String name, String description, String imageUrl, String modelUrl, 
                   String modelType, BigDecimal price, boolean featured) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.modelUrl = modelUrl;
        this.modelType = modelType;
        this.price = price;
        this.featured = featured;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getModelUrl() { return modelUrl; }
    public void setModelUrl(String modelUrl) { this.modelUrl = modelUrl; }

    public String getModelType() { return modelType; }
    public void setModelType(String modelType) { this.modelType = modelType; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }
}