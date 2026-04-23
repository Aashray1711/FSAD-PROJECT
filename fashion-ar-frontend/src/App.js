import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Storefront from './components/Storefront';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import AdminPanel from './components/AdminPanel';
import ARTryOn from './components/ARTryOn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Storefront />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/ar/:id" element={<ARTryOn />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;