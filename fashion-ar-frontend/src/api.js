import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getProducts = () => api.get("/products");
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (payload) => api.post("/products", payload);
export const getCart = () => api.get("/cart");
export const addToCart = (payload) => api.post("/cart", payload);
export const checkout = (payload) => api.post("/checkout", payload);
