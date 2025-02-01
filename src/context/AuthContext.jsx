import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// src/context/AuthContext.jsx
export const API_BASE_URL = "https://mern-url-backend.onrender.com";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, API_BASE_URL }}>
      {children}
    </AuthContext.Provider>
  );
};
