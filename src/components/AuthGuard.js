import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return <>{children}</>;
};

export default AuthGuard;
