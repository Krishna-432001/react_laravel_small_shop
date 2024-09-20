import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/frontend/HomePage'
import Login from './components/frontend/auth/Login'
import Register from './components/frontend/auth/Register'
import ForgetPassword from './components/frontend/auth/ForgetPassword'
import Profile from './components/frontend/auth/Profile'
import AppLayout from './components/frontend/layout/AppLayout';

const App = () => {
  return (

    <Router>

      <AppLayout>

        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          {/* Add more routes here */}
        </Routes>

      </AppLayout>
      
    </Router>
  );
};

export default App;