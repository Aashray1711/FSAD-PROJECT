import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api";

function Storefront() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data || []))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Storefront</h2>
      <div className="grid">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
            <div className="card">
              <div style={{ minHeight: 180, display: "grid", placeItems: "center", background: "#f8fafc", borderRadius: 14, marginBottom: 12 }}>
                <span style={{ color: "#64748b" }}>Open product to preview 3D model</span>
              </div>
              <h3>{product.name}</h3>
              <p style={{ margin: "8px 0 0", color: "#475569" }}>${Number(product.price).toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Storefront;
