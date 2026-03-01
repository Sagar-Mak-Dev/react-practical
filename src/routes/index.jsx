import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProductList from '../pages/ProductList';
import CrudPage from '../pages/CrudPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/crud"
        element={
          <ProtectedRoute>
            <CrudPage />
          </ProtectedRoute>
        }
      />
      
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/products" replace />} />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/products" replace />} />
    </Routes>
  );
};

export default AppRoutes;
