import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProductsPage from "./components/pages/ProductsPages";
import ProductPage from "./components/pages/ProductPage";
import CreateProductPage from "./components/pages/CreateProductPage";
import EditProductPage from "./components/pages/EditProductPage";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/create-product" element={<CreateProductPage />} />
      <Route path="/edit-product/:id" element={<EditProductPage />} />
      <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
  </Router>
);

export default App;
