import React, { useEffect, useState } from 'react';
import { AuthContext } from './authContext';
import { storage } from '../utils/storage.ts';
import { axios } from '../lib/axios';

export interface AuthContextValues {
  user: any;
  login: (props: LoginProps) => any;
  logout: () => void;
  register: (props: RegisterProps) => any;
  resetPassword: (props: ResetPasswordProps) => any;
  requestResetPassword: ({ email }: { email: string }) => any;
}
export interface AuthProviderProps {
  children: React.ReactNode;
}
export interface RegisterProps {
  email: string;
  password: string;
  fullName: string;
}
export interface LoginProps {
  email: string;
  password: string;
}
export interface ResetPasswordProps {
  email: string;
  password: string;
  token: string;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    if (storage?.getToken()) {
      const { data } = await axios.get('user/me');
      setUser(data);
      return data;
    }
    return null;
  }
  const login = async ({ email, password }: LoginProps) => {
    try {
      const res = await axios.post('auth/login', { email, password });
      if (res.data) {
        setUser(res?.data?.user);
        storage.setToken(res?.data?.accessToken);
        storage.setRefreshToken(res?.data?.refreshToken);
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const register = async ({ email, password, fullName }: RegisterProps) => {
    try {
      const res = await axios.post('user', {
        email,
        password,
        fullName,
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      storage.clearTokens();
    } catch (err) {
      console.log(err);
    }
  };

  const resetPassword = async ({ password, token, email }: any) => {
    try {
      const res = await axios.post(`auth/reset-password/${token}`, {
        password,
        email,
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const requestResetPassword = async ({ email }: { email: string }) => {
    try {
      const data = await axios.post('auth/reset-password', { email });
      console.log('DATA', data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        resetPassword,
        requestResetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
