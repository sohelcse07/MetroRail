import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    if (!token) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/account/user`, {
        headers: { Authorization: `Token ${token}` },
      });
      setUser(res.data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user data');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const updateUser = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/account/user`, 
        userData, 
        {
          headers: { 
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
      setUser(res.data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/account/user`, {
        headers: { Authorization: `Token ${token}` },
      });
      setUser(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    return await fetchUser();
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser(null);
    }
  }, [token, fetchUser]);

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        isLoading, 
        error,
        fetchUser: refreshUser,
        updateUser, 
        deleteUser,
        clearError: () => setError(null)
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};