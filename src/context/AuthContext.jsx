import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken') || '');

  const register = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/account/register`, data);
    setToken(res.data.token);
    localStorage.setItem('authToken', res.data.token);
    return res.data;
  };

  const login = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/account/login`, data);
    setToken(res.data.token);
    localStorage.setItem('authToken', res.data.token);
    return res.data;
  };

  const logout = async () => {
    await axios.post(`${import.meta.env.VITE_SERVER_URL}/account/logout`, null, {
      headers: { Authorization: `Token ${token}` },
    });
    setToken('');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ token,setToken, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
