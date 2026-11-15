import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [lawyerProfile, setLawyerProfile] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('lawbd_token') || null);
  const [loading, setLoading] = useState(true);

  // Initialize auth
  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.getMe();
        if (res.success) {
          setUser(res.user);
          setLawyerProfile(res.lawyerProfile || null);
        } else {
          logout();
        }
      } catch (err) {
        console.warn('Failed to load user session:', err.message);
        logout();
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    if (res.success) {
      localStorage.setItem('lawbd_token', res.token);
      setToken(res.token);
      setUser(res.user);
      setLawyerProfile(res.lawyerProfile || null);
    }
    return res;
  };

  const register = async (userData) => {
    const res = await api.register(userData);
    if (res.success) {
      localStorage.setItem('lawbd_token', res.token);
      setToken(res.token);
      setUser(res.user);
      setLawyerProfile(res.lawyerProfile || null);
    }
    return res;
  };

  const demoLogin = async (role) => {
    const res = await api.demoLogin(role);
    if (res.success) {
      localStorage.setItem('lawbd_token', res.token);
      setToken(res.token);
      setUser(res.user);
      setLawyerProfile(res.lawyerProfile || null);
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('lawbd_token');
    setToken(null);
    setUser(null);
    setLawyerProfile(null);
  };

  const updateProfile = async (updates) => {
    const res = await api.updateProfile(updates);
    if (res.success) {
      setUser(res.user);
    }
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        lawyerProfile,
        token,
        loading,
        isAuthenticated: !!user,
        role: user?.role || 'visitor',
        login,
        register,
        demoLogin,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
