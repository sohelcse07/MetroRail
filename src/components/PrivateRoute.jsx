import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { token } = useAuth();
  console.log(token)

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
