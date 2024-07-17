import React, { createContext, useState, useContext, useEffect } from 'react';
import { dummyUsers } from '../dummyUsers';
import axios from "../axiosConfig";
import handleAdminSignIn from "../../src/pages/SignIn";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      const { user, token, needsPasswordReset } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setIsAuthenticated(true);
      setCurrentUser(user);

      if (needsPasswordReset) {
        return { success: true, needsPasswordReset: true };
      }

      return { success: true, needsPasswordReset: false };
    } catch (error) {
      console.error('Login failed', error);
      setIsAuthenticated(false);
      setCurrentUser(null);
      return { success: false };
    }
  };

  const adminLogin = async (username, password) => {
    console.log("RUNNING")
    try {
      const response = await axios.post('/api/auth/adminLogin', { username, password });
      console.log("adminLogin",response);
      console.log(username,password)
        if (response.status === 200) {
          setIsAdminAuthenticated(true);
          console.log(username,password)
          return { success: true}
        } else {
          // Authentication failed
          setError("Invalid username or password");
          return { success: false}
        }
    } catch (error) {
      setIsAdminAuthenticated(false);
      if (error.response && error.response.status === 401) {
        return { success: false, message: 'Invalid credentials' };
      } else {
        console.error('Error during admin login:', error);
        return { success: false, message: 'Internal server error' };
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setIsAdminAuthenticated(false);
  };
 //verify endpoint for token?
 const checkAuth = () => {
  console.log('check auth triggered');
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  if (token && user) {
    console.log('token and user case');
    setIsAuthenticated(true);
    setCurrentUser(user);
  } else if (!isAdminAuthenticated) {
    console.log('!isAdmin');
    navigate("/signin");
  }
  //navigate("/signin");
  //setLoading(false);
};

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    currentUser,
    setCurrentUser,  
    login, 
    logout,
    adminLogin,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
