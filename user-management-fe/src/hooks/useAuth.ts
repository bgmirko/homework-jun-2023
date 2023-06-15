import React from 'react';
import { AuthContext } from '../context/authContext.ts';
import { AuthContextValues } from '../context/authContextProvider.tsx';

export function useAuth(): AuthContextValues {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within an AuthProvider`);
  }
  return context;
}
