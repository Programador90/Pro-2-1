import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuth = localStorage.getItem('access_token') !== null;
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
