import React, { createContext, useState, useContext, useEffect } from 'react';
import { dummyUsers } from '../dummyUsers';
import axios from "../axiosConfig";
import handleAdminSignIn from "../../src/pages/SignIn";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated,setIsAdminAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [error, setError] = useState("");

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
    try {
      const response = await axios.post('/api/auth/adminLogin', { username, password });
      // console.log("adminLogin",response);
      // console.log(username,password)
        if (response.status === 200) {
          setIsAdminAuthenticated(true);
          // console.log(username,password)
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
  };
 //verify endpoint for token?
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
    } else {
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const fetchBeneficiaryProfile = async () => {
    try {
      const storedProfile = localStorage.getItem('profile');
  
      if (!storedProfile || storedProfile !== profileData) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.Id) {
          const salesforceId = user.Id;
          const response = await axios.get(`/api/profile/beneficiaryDetails/${salesforceId}`);
          const profile = response.data;
          // console.log("Call made")
          setProfileData({
            username: profile.username,
            aboutMe: profile.aboutMe,
            streetAddress: profile.streetAddress,
          });
  
          localStorage.setItem('profile', JSON.stringify(profile));
        } else {
          alert("Please log in"); // Customize this
        }
      } else {
        const parsedProfile = JSON.parse(storedProfile);
        if (parsedProfile && Object.keys(parsedProfile).length > 0 && parsedProfile === profileData ) {
          setProfileData({
            username: parsedProfile.username,
            aboutMe: parsedProfile.aboutMe,
            streetAddress: parsedProfile.streetAddress,
          });
        }
        // console.log("Exists")
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };
  
  
  

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
    fetchBeneficiaryProfile,
    profileData,
    setProfileData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
