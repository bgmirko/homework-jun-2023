import React from 'react';
import { AuthContextValues } from './authContextProvider';

export const AuthContext = React.createContext<AuthContextValues | null>(null);
