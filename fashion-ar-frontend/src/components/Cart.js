import React, { useEffect, useState } from "react";
import { getCart, checkout } from "../api";

function Cart() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    getCart()
      .then((res) => setItems(res.data || []))
      .catch((error) => console.error(error));
  }, []);

  const handleCheckout = async () => {
    try {
      const order = {
        items,
        total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      };
      await checkout(order);
      setStatus("Order placed successfully.");
      setItems([]);
    } catch (error) {
      console.error(error);
      setStatus("Checkout failed.");
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <div className="card">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div className="card">
          {items.map((item) => (
            <div key={item.productId} style={{ marginBottom: 18 }}>
              <strong>{item.productName}</strong>
              <div>Qty: {item.quantity}</div>
              <div>Price: ${Number(item.price).toFixed(2)}</div>
              <div>Subtotal: ${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
          <div style={{ marginTop: 10, fontWeight: 700 }}>Total: ${total.toFixed(2)}</div>
          <button style={{ marginTop: 14 }} onClick={handleCheckout}>
            Checkout
          </button>
          {status && <p style={{ marginTop: 12 }}>{status}</p>}
        </div>
      )}
    </div>
  );
}

export default Cart;
