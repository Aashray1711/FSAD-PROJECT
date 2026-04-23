import React, { useState } from "react";
import { createProduct } from "../api";

function AdminPanel() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [glbUrl, setGlbUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createProduct({ name, description, price: Number(price), glbUrl });
      setMessage("Product saved successfully.");
      setName("");
      setPrice("");
      setDescription("");
      setGlbUrl("");
    } catch (error) {
      console.error(error);
      setMessage("Unable to save product. Check the backend.");
    }
  };

  return (
    <div className="card">
      <h2>Admin Panel</h2>
      <p>Add a clothing item and link to a `.glb` model.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Price (USD)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="form-group">
          <label>GLB URL</label>
          <input
            value={glbUrl}
            onChange={(e) => setGlbUrl(e.target.value)}
            placeholder="/models/shirt.glb or https://example.com/shirt.glb"
            required
          />
        </div>

        <button type="submit">Save product</button>
      </form>
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}

export default AdminPanel;
