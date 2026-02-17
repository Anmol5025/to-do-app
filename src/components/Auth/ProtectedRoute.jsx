import React from 'react';
import { Navigate } from 'react-router-dom';
import { storage } from '../../utils/storage';

export default function ProtectedRoute({ children }) {
  const user = storage.getUser();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
