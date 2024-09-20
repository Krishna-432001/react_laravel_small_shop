import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/frontend/auth/Login'
import Register from './components/frontend/auth/Register'
import ForgetPassword from './components/frontend/auth/ForgetPassword'
import AppLayout from './components/frontend/layout/AppLayout';

const App = () => {
  return (

    <Router>

      <AppLayout>

        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          {/* Add more routes here */}
        </Routes>

      </AppLayout>
      
    </Router>
  );
};

export default App;