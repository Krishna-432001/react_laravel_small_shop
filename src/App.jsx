import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/frontend/HomePage'
import Login from './components/frontend/auth/Login'
import Register from './components/frontend/auth/Register'
import CategoryPage from './components/frontend/CategoryPage';
import ForgetPassword from './components/frontend/auth/ForgetPassword'
import Profile from './components/frontend/auth/Profile'
import AppLayout from './components/frontend/layout/AppLayout';
import Cart from './components/frontend/Cart';
import ProductDetail from './components/frontend/ProductDetail';

const App = () => {
  return (

    <Router>

      <AppLayout>

        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          {/* Add more routes here */}
        </Routes>

      </AppLayout>
      
    </Router>
  );
};

export default App;