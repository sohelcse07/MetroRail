import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token } = useAuth();
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    if (!token) return;
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/account/user`, {
      headers: { Authorization: `Token ${token}` },
    });
    setUser(res.data);
  };

  const updateUser = async (userData) => {
    const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/account/user`, userData, {
      headers: { Authorization: `Token ${token}` },
    });
    setUser(res.data);
    return res.data;
  };

  const deleteUser = async () => {
    await axios.delete(`${import.meta.env.VITE_SERVER_URL}/account/user`, {
      headers: { Authorization: `Token ${token}` },
    });
    setUser(null);
  };

  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={{ user, fetchUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
