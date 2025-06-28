import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth} from './AuthContext'
const PrivateRoute = ({ children })=> {
  const { isLoggedIn, loading } = useAuth();
  console.log("PrivateRoute isLoggedIn:", isLoggedIn);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute;