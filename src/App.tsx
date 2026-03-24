import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { TelegramProvider } from './context/TelegramContext';
import CategoriesPage from './pages/CategoriesPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';

const App: React.FC = () => {
  return (
    <TelegramProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<CategoriesPage />} />
          <Route path="/category/:categoryId" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
        </Routes>
      </HashRouter>
    </TelegramProvider>
  );
};

export default App;
