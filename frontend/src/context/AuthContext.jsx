import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check login status on initial load
    useEffect(() => {
        axios
            .get('http://localhost:8080/is-logged-in', { withCredentials: true })
            .then((response) => {
                setIsLoggedIn(response.data.loggedIn);
                setUserRole(response.data.role || null);
            })
            .catch((error) => {
                console.error('Error checking login status', error);
            })
            .finally(()=>{
                setLoading(false);
            });
    }, []);

    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout, userRole, setUserRole, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
  return useContext(AuthContext);
};