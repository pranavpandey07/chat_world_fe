import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const tokens = localStorage.getItem('authTokens');
    return tokens ? JSON.parse(tokens) : null;
  });

  const [user, setUser] = useState(() => {
    const tokens = localStorage.getItem('authTokens');
    return tokens ? jwtDecode(JSON.parse(tokens).access) : null;
  });

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        email,
        password,
      });

      const tokens = response.data;
      setAuthTokens(tokens);
      setUser(jwtDecode(tokens.access));
      localStorage.setItem('authTokens', JSON.stringify(tokens));

      // Store user details separately if needed
      const userDetailsResponse = await axios.post('http://localhost:8000/api/chatting/user/login/', {
        email,
        password,
      });
      localStorage.setItem('userDetails', JSON.stringify(userDetailsResponse.data.user_details));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    localStorage.removeItem('userDetails');
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
  }, [authTokens]);

  return (
    <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
