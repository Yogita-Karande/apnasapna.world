// ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ path, element }) => {
  const token = useSelector((state) => state.token.token);

  return token ?  <Route path={path} element={element} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
