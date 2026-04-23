import React, { useState, useEffect } from 'react';
import api from '../api';

const ProductPage = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${productId}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Error:', err));
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} width="200" />
      <p>{product.description}</p>
      <p><strong>${product.price}</strong></p>

      {product.modelUrl && (
        <button
          onClick={() => window.location.href = `/ar/${product.id}`}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            backgroundColor: '#ff6b9d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          🔮 Try in AR
        </button>
      )}

      <button onClick={() => window.history.back()}>Back</button>
    </div>
  );
};

export default ProductPage;